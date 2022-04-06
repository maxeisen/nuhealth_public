import Head from "next/head";
import Link from "next/link";
import { Form, Input, Button, Image } from "antd";
import { useRouter } from "next/router";
import { useState } from 'react';
import { fs } from "../firebaseConfig";
import "antd/dist/antd.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../styles/onboarding.module.css";

function Login() {
  const router = useRouter();
  const [noPatientError, setNoPatientError] = useState(false);

  const onFinish = (patient) => {
    const q = query(
      collection(fs, "patients"),
      where("firstName", "==", patient.firstName),
      where("lastName", "==", patient.lastName)
    );
    getDocs(q)
      .then((response) => {
        response.docs.some(doc => {return doc.id == patient.phn}) ? router.push('/consent/' + patient.phn) : setNoPatientError(true);
      })
      .catch((error) => {
        setNoPatientError(true)
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Patient Sign-in</title>
      </Head>
      <div className={styles.header}>
       <Image className={styles.homeImage} src="../static/ontarioHealth.png" alt="Ontario Health Logo" width={180} height={59} preview={false}/>
        <p className={styles.subHeader}>
          Powered by
          <b> NuHealth Inc.</b>
        </p>
        <div className={styles.formTitle}>Sign in</div>
        <div className={styles.formDescription}>Customize who has access to your health information
        <br/><br/>
        <p>For onboarding demo, enter: <b>Roger, Zhang, 0234912023-RG</b> below.</p>
        <p>For EMT-facing patient search demo, click <Link href="/">here</Link>.</p>
        </div>
      </div>
      {noPatientError && <p className={styles.error}>No patient found.</p>}
      <main className={styles.main}>
        <Form
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          className={styles.search}
        >
          <div className={styles.formInput}>
          <h3>First Name</h3>
            <Form.Item
              name="firstName"
            >
              <Input placeholder="Roger" className={styles.input}/>
            </Form.Item>

            <h3>Last Name</h3>
            <Form.Item
              name="lastName"
            >
              <Input placeholder="Zhang" className={styles.input}/>
            </Form.Item>

            <h3>PHN</h3>
            <Form.Item
              name="phn"
            >
              <Input.Password placeholder="1234567890" className={styles.input}/>
            </Form.Item>
          </div>
          <Form.Item
          >
            <div className={styles.buttonContainer}>
              <Button type="primary" htmlType="submit" className="submit-button">
                Sign In
              </Button>
            </div>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
}

export default Login;
