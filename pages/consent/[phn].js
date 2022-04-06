import Head from "next/head";
import styles from "../../styles/consent.module.css";
import { useRouter } from 'next/router';
import { Affix, Button, Image } from "antd";
import "antd/dist/antd.css";
import { Content } from "antd/lib/layout/layout";

function Consent({ patientData }) {
  const router = useRouter();
    
    return (
    <div className={styles.container}>
      <Head>
        <title>Consent Data</title>
      </Head>
       <div className={styles.header}>
       <Image className={styles.homeImage} src="../static/ontarioHealth.png" alt="Ontario Health Logo" preview={false}/>
        <p className={styles.subHeader}>
          Powered by
          <b> NuHealth Inc.</b>
        </p>
      </div>
      <div className={styles.main}> 
        <h2>Allow healthcare professionals to access your electronic health records.</h2>
        <p>
          We value your security. Your medical history will be used to guide decision making in times of medical emergency.
        </p>
        <div className={styles.list}>
          <b>Who has access</b>
          <ul>
            <li>health care practitioners, (including doctors, nurses, speech-language</li>
            <li>pathologists, chiropractors, dental professionals, dieticians</li>
            <li>medical laboratory technologists, massage therapists, midwives, occupational therapists,</li>
            <li>opticians and physiotherapists),</li>
            <li>community care access corporations,</li>
            <li>hospitals,</li>
            <li>psychiatric facilities,</li>
            <li>long-term care homes</li>
            <li>pharmacies,</li>
            <li>laboratories,</li>
            <li>ambulance services,</li>
            <li>retirement homes and homes for special care,</li>
            <li>medical officers of health of boards of health,</li>
            <li>the Minister of Health and Long-Term Care and</li>
            <li>Canadian Blood Services.</li>
            </ul>
        </div>
        <div className={styles.list}>
          <b>What is Personal Health Information</b>
          <ul>
            <li>relates to the individual’s physical or mental condition</li>
            <li>including family medical history</li>
            <li>relates to the provision of health care to the individual,</li>
            <li>is a plan of service for the individual,</li>
            <li>relates to payments, or eligibility for health care or for coverage for health care,</li>
            <li>relates to the donation of any body part or bodily substance</li>
            <li>or is derived from the testing or examination of any such body part or bodily substance,</li>
            <li>is the individual’s health number or</li>
            <li>identifies a health care provider or a substitute decision-maker for the individual.</li>
          </ul>
        </div>
      </div>
      <div className={styles.footer}>
        <Button type="primary" htmlType="submit" className="submit-button" onClick={() => {router.push('/approved/' + patientData.phn)}}>
          I consent
        </Button>
        <Button type="link" htmlType='link' className="submit-link" onClick={() => {router.push('/customize/' + patientData.phn)}}>Customize Consent Terms</Button>
      </div>
    </div>)
}

export default Consent;

export async function getServerSideProps({ params }) {
  try {
    return {
      props: {
        patientData: params,
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
