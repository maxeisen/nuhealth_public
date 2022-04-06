import Head from "next/head";
import styles from "../../styles/access.module.css";
import { useRouter } from 'next/router';
import {
  ArrowLeftOutlined
} from "@ant-design/icons";
import { Image, Checkbox, Button, Row, Col } from "antd";
import "antd/dist/antd.css";
import { fs } from '../../firebaseConfig'
import { getDoc, doc, setDoc } from 'firebase/firestore'


export default function Access({patientData}) {

    const router = useRouter();
    const next = patientData.phn + '?updated';

    const handleOnClick = () => {
      console.log(patientData.phn)
      try {
        const fsInstance = doc(fs, 'patients', patientData.phn);
        setDoc(fsInstance, {permisionSet: patientData.permissionSet}, {merge: true}).then(() => {
          router.push({pathname:'/approved/[next]', query: {next}})
        });
      } catch (e) {

      }
    }

    const handleOnChange = (checkedValues) => {
      patientData.permissionSet.forEach(v => {
        v.isChecked = checkedValues.includes(v.description)
      })
    }

    return (
    <div>
      <Head>
        <title>Customize Access for {patientData.phn}</title>
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
        <h1>Customize Who Has Access to EHR</h1>
        <h4>Healthcare professionals are required under PHIPA to keep your information confidential. Your information is used only to help them serve you.</h4>
        <p>Who has access</p>
        <Checkbox.Group defaultValue={patientData.checkedPermissions} onChange={handleOnChange}>
          <Row>
          {patientData.permissions?.map(p => {
        return (
          <Col span={24} key={p.label}>
            <Checkbox value={p.label}>{p.label}</Checkbox>
          </Col>
        )
      })} 
          </Row> 
        </Checkbox.Group>
      </div>
      <div className={styles.footer}>
        <div className={styles.buttonContainer}>
          <Button type="primary" htmlType="submit" className="submit-button" onClick={handleOnClick}>
            Update Consent Terms
          </Button>
        </div>
      </div>
    </div>)

}

export async function getServerSideProps({ params }) {
    try {
      const docRef = doc(fs, 'patients', params.phn);
      const docSnap = await getDoc(docRef);
      const fullDocData = docSnap.data();
      const {dob, permisionSet} = fullDocData;
      const patientData = {
        phn: params.phn,
        dob: fullDocData.dob.toDate().toISOString(),
        permissions: permisionSet.map(p => {return {label: p.description, value: p.description}}),
        checkedPermissions: permisionSet.filter(p => {return p.isChecked}).map(i => {return i.description}),
        permissionSet: permisionSet
      }
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