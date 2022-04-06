
import Head from "next/head";
import styles from "../../styles/approved.module.css";
import { useRouter } from 'next/router';
import {
  ArrowLeftOutlined,
  CheckCircleFilled
} from "@ant-design/icons";
import { Button, Image } from "antd";
import "antd/dist/antd.css";

function Consent({ patientData }) {
  const router = useRouter();

  const displayBody = () => {
    if (!patientData.isUpdated) {
      return (
        <div>
          <Head>
            <title>Permission Granted for {patientData.phn}</title>
          </Head>
          <h1>Permission Granted</h1>
          <p>Medical professionals now have access to the imporant information they need to service you.</p>
        </div>
      )
    } else {
      return ( 
      <div>
        <Head>
          <title>Consent Updated for {patientData.phn}</title>
        </Head>
        <h1>Consent Terms Updated</h1>
        <p>You have successfully updated who has access to your EHR.</p>
      </div>)
    }
  }
    
    return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.tooltipContainer}>
          <button className={styles.tooltip} onClick={() => {router.push((!patientData.isUpdated ? '/consent/' : '/access/') + patientData.phn)}}><ArrowLeftOutlined style={{ fontSize: '37px' }}/></button>
        </div>
        <div className={styles.imageContainer}>
          <Image className={styles.homeImage} src="../static/ontarioHealth.png" alt="Ontario Health Logo" preview={false}/>
          <p className={styles.subHeader}>
            Powered by
            <b> NuHealth Inc.</b>
          </p>
        </div>
      </div>
      <div className={styles.main}> 
        <CheckCircleFilled style={{ fontSize: '50px', color: '#487E22' }}/>
        {displayBody()}
        <div className={styles.buttonContainer}><Button onClick={() => {router.push('/consent/' + patientData.phn)}}>View Consent</Button></div>
      </div>
      <div className={styles.footer}>
        <Button type="link" htmlType='link' className="submit-link" onClick={() => {router.push('/customize/' + patientData.phn)}}>Edit Consent Terms</Button>
      </div>
    </div>)
}

export default Consent;

export async function getServerSideProps({ params }) {
  const [phn , updated] = params.phn.split('?');
  try {
    return {
      props: {
        patientData: {
          phn,
          isUpdated: updated ? true : false
        },
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
