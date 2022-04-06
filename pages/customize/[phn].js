import Head from "next/head";
import styles from "../../styles/customize.module.css";
import { useRouter } from 'next/router';
import {
  ArrowLeftOutlined
} from "@ant-design/icons";
import { Image } from "antd";
import "antd/dist/antd.css";
import SelectionCard from '../../components/SelectionCard/SelectionCard';

export default function Customize({ patientData }) {
  
  const router = useRouter();


  const selectionCardData = [
    {
      title: 'Edit who has access',
      description: 'Edit which custodians have access to your electronic health records.',
      actionable: true,
      onClick: () => {
        router.push('/access/' + patientData.phn);},
      color: '#40AAB1'
    },
    {
      title: 'Edit what to share',
      description: 'Edit which electronic health record you would like to share with custodians.',
      color: '#9C589D'
    }
  ]

  
  return(
    <div className={styles.container}>
      <Head>
        <title>Customize Consent for {patientData.phn}</title>
      </Head>
      <div className={styles.header}>
        <div className={styles.tooltipContainer}>
          <button className={styles.tooltip} onClick={() => {router.push('/consent/' + patientData.phn)}}><ArrowLeftOutlined style={{ fontSize: '37px' }}/></button>
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
        <h1> <b>Customize Consent Terms</b></h1>
        <h4>Under the Personal Health Protection Act (PHIPA), you have the right to customize consent to your electronic health records.</h4>
      </div>
      {selectionCardData.map((data) => {
          return(
            <SelectionCard key={data.title.replace(' ', '')} props={data}/>
          )
        })}

    </div>
  );

  
}

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
