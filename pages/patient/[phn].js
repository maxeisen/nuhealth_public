import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { app, fs } from "../../firebaseConfig";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Dashboard from "../../components/Dashboard/Dashboard";
import "antd/dist/antd.css";
import { Col, Row } from 'antd';
import OPQRSTForm from '../../components/IntakeForms/OPQRSTForm';
import styles from "../../styles/PatientOverview.module.css";
import { Animated } from 'react-animated-css';

export default function Patient({ patientData }) {
  const router = useRouter();
  const [formVisible, setFormVisible] = useState(false);

  const handleFormVisible = () => {
    setFormVisible(!formVisible);
  }

  return (
    <div className={styles.patientContainer}>
      <Head>
        <title>Patient Information for {patientData.firstName}</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css" />
      </Head>
      <Row>
        <Col span={5}><NavigationBar data={patientData}/></Col>
        <Col span={19}><Dashboard props={{data: patientData, handleFormVisible: handleFormVisible}}/></Col>
        <div className={styles.formModal}>
          <Animated animationIn="slideInRight" animationOut="slideOutRight" animationInDuration={250} animationOutDuration={250} isVisible={formVisible}>
            {formVisible && <OPQRSTForm/>}
          </Animated>
        </div>
      </Row>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const docRef = doc(fs, "patients", params.phn);
    const docSnap = await getDoc(docRef);
    const fullDocData = docSnap.data();
    const { dob, ...filteredDocData } = fullDocData;
    const patientData = {
      phn: params.phn,
      dob: dob.toDate().toISOString(),
      ...filteredDocData,
    };
    return {
      props: {
        patientData: patientData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        patientData: {},
      },
    };
  }
}
