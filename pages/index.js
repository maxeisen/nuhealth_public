import { useState } from 'react';
import { useRouter } from "next/router";
import Head from "next/head";
import Link from 'next/link';
import styles from "../styles/Home.module.css";
import { app, fs } from "../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import NavigationBar from "../components/NavigationBar/NavigationBar.jsx";
import "antd/dist/antd.css";
import {
  Input,
  Label,
  Divider,
  Form,
  Button,
  DatePicker,
  Checkbox,
  Image
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Home(props) {
  const [phnEntry, setPhnEntry] = useState(false);
  const [nameEntry, setNameEntry] = useState(false);
  const [noPatientError, setNoPatientError] = useState(false);
  const router = useRouter();
  const { Search } = Input;

  // Generate patient list for filtering
  const patientSearchList = [];
  let id = 0;
  props.patients.forEach((patient) => {
    patientSearchList.push({
      id: id,
      name: patient.firstName + " " + patient.lastName,
      ...patient
    });
    id++;
  });

  const onFinish = (values) => {
    const phnResult = patientSearchList.filter(patient => values.phn === patient.phn);
    const nameResult = patientSearchList.filter(patient => 
      patient.name.toLowerCase() === values.name.toLowerCase() &&
      patient.dob.split('T')[0] === values.dob.toISOString().split('T')[0]
    );
    console.log(phnResult)
    if (phnResult.length > 0) {
      router.push("/patient/" + phnResult[0].phn);
    } else if (nameResult.length > 0) {
      router.push("/patient/" + nameResult[0].phn);
    } else {
      setNoPatientError(true);
    }
  };

  const onChangePHN = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setPhnEntry(false);
    } else {
      setNoPatientError(false);
      setPhnEntry(true);
    }
  }

  const onChangeName = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setNameEntry(false);
    } else {
      setNoPatientError(false);
      setNameEntry(true);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NuHealth Patient Search</title>
      </Head>

      <main className={styles.main}>
        <Image
          alt="Ontario Health Logo"
          width={182}
          src="../static/ontarioHealth.png"
          preview={false}
        />
        <div className={styles.hero}>
          <h1 className={styles.title}><b>Locate Patient</b></h1>
        </div>
        <Form
          name="basic"
          initialValues={{
            name: "",
            phn: "",
            dob: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
          size='large'
          className={styles.search}
        >
          <h2>Personal Health Number</h2>
          <Form.Item name="phn">
            <Input placeholder="0123456789-XX" onChange={onChangePHN} disabled={nameEntry} className={styles.input}/>
          </Form.Item>
          <p>For dashboard demo, enter PHN: <b>0234912023-RG</b> above and search.</p>
          <p>For patient-facing platform demo, click <Link href="/onboarding">here</Link>.</p>

          <h1 className={styles.or}>OR</h1>

          <h2>Full Name</h2>
          <Form.Item name="name">
            <Input placeholder="Roger Zhang" onChange={onChangeName} disabled={phnEntry} className={styles.input}/>
          </Form.Item>

          <h2>Date of Birth</h2>
          <Form.Item name="dob">
            <DatePicker placeholder="YYYY-MM-DD" disabled={phnEntry} className={styles.datepicker}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton} icon={<SearchOutlined/>}>
              Search
            </Button>
          </Form.Item>
        </Form>
        {noPatientError && <p className={styles.error}>No patient found.</p>}
      </main>
      <footer className={styles.footer}>
        <p>
          Powered by <b>NuHealth Inc.</b>
        </p>
      </footer>
    </div>
  );
}

// get server side props
export async function getServerSideProps() {
  try {
    // get all patients to reference
    const fsInstance = collection(fs, "patients");
    const patientsData = await getDocs(fsInstance);
    const patients = patientsData.docs.map((doc) => {
      const fullDocData = doc.data();
      const { dob, ...filteredDocData } = fullDocData;
      return {
        phn: doc.id,
        //convert dob to iso format
        dob: dob.toDate().toISOString(),
        //all data except for dob
        ...filteredDocData,
      };
    });

    return {
      props: {
        patients: patients,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        patients: [],
      },
    };
  }
}
