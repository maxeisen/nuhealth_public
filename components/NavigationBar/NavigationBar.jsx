import { Row, Col, Button, Tooltip, Divider, Menu, Image } from "antd";
import {
  LeftOutlined,
  MedicineBoxOutlined,
  PlusCircleOutlined,
  PaperClipOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "../../styles/NavigationBar.module.css";
import { getAge } from "../../utils.js";

function NavigationBar(data) {
  const router = useRouter();

  const patientData = data.data;

  const goHome = () => {
    router.push("/");
  }

  return (
    <Col className={styles.container}>
      <Col className={styles.patientInfo}>
        <Row className={styles.row1}>
          <Col span={6}>
            <Tooltip title="back">
              <Button shape="circle" icon={<LeftOutlined />} onClick={goHome} />
            </Tooltip>
          </Col>
          <Col span={12}>
            <Image
              alt="Ontario Health Logo"
              width={182}
              src="../../static/ontarioHealth.png"
              preview={false}
            />
          </Col>
        </Row>
        <Row className={styles.row2}>
          <Col span={9}>
            <Image
              alt={`${patientData.firstName} headshot`}
              className={styles.patientImage}
              width={112}
              src={`../../static/headshots/${patientData.headshot}.jpg`}
              preview={false}
            />
          </Col>
          <Col span={14} className={styles.nameAndPhone}>
            <Row className={styles.name}>
              <Col span={12}>{patientData.firstName + " " + patientData.lastName}</Col>
            </Row>
            <Row className={styles.phone}>
              <Col span={14}>{patientData.phone?patientData.phone:"No Phone"}</Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles.detailsHeader}>
          <Col span={6}>Details</Col>
        </Row>
        <Divider />
        <Col className={styles.details}>
          <Row className={styles.detailsRows}>
            <Col className={styles.detailsSubheader} span={17}>Age</Col>
            <Col className={styles.detailsData} span={7}>{getAge(patientData.dob)} Y</Col>
          </Row>
          <Row className={styles.detailsRows}>
            <Col className={styles.detailsSubheader} span={17}>Blood Group</Col>
            <Col className={styles.detailsData} span={7}>{patientData.bloodType}</Col>
          </Row>
          <Row className={styles.detailsRows}>
            <Col className={styles.detailsSubheader} span={17}>Height (m)</Col>
            <Col className={styles.detailsData} span={7}>{patientData.height}</Col>
          </Row>
          <Row className={styles.detailsRows}>
            <Col className={styles.detailsSubheader} span={17}>Weight (Kg)</Col>
            <Col className={styles.detailsData} span={7}>{patientData.weight}</Col>
          </Row>
        </Col>
      </Col>
      <Menu
        style={{ fontSize: 18 }}
        defaultOpenKeys={"overview"}
        mode="vertical"
      >
        <Menu.Item key="overview" icon={<MedicineBoxOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="intakeForm" icon={<FormOutlined />}>
          Intake Form
        </Menu.Item>
        <Menu.Item key="recentVisits" icon={<PlusCircleOutlined />}>
          Patient Recent Visits
        </Menu.Item>
        <Menu.Item key="docs" icon={<PaperClipOutlined />}>
          Documents
        </Menu.Item>
      </Menu>
      <Row className={styles.footer}>
        <span className={styles.poweredBy}>Powered by</span>&nbsp;<span className={styles.nuhealth}>NuHealth Inc.</span>
      </Row>
    </Col>
  );
}

export default NavigationBar;
