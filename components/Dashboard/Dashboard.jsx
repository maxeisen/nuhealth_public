import { Row, Col, Divider, Card, List, Select, Option } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import styles from "../../styles/Dashboard.module.css";
import IntakeForms from "../IntakeForms/IntakeForms";

function Dashboard(props) {
  const patientData = props.props.data;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const antStyle = {
    card: {
      boxShadow: "2px 0px 10px rgba(0, 0, 0, 0.05)",
      borderRadius: "6px",
    },
    conditionsCard: {
      maxHeight: 250,
      overflow: "auto",
    },
    medicationsCard: {
      maxHeight: 250,
      overflow: "auto",
      width: "85%",

    },
    visitsCard: {
      maxHeight: 145,
      overflow: "auto",
    }
  };

  return (
    <>
      <Col className={styles.container}>
        <Row className={styles.dashboard}>Dashboard</Row>
        <Row className={styles.row1}>
          <Col>
            <Row>
              <Col className={styles.cardHeader} span={19}>
                Health Conditions / Events
              </Col>
            </Row>
            <Row>
              <Card style={{...antStyle.conditionsCard, ...antStyle.card}}>
                {patientData.healthConditions?.map((healthCondition, i) => {
                  var isLast = false;
                  if (i + 1 === patientData.healthConditions.length) {
                    isLast = true;
                  }
                  return (
                    <>
                      <Row>
                        <Col span={14}>
                          <Row className={styles.itemName}>
                            {healthCondition.name}
                          </Row>
                          <Row className={styles.itemText}>
                            {healthCondition.date}
                          </Row>
                          <Row className={styles.itemText}>
                            {healthCondition.description}
                          </Row>
                        </Col>
                        <Col className={styles.itemText} span={2} push={8}>
                          <a>
                            <u>View</u>
                          </a>
                        </Col>
                      </Row>
                      {!isLast && <Divider />}
                    </>
                  );
                })}
              </Card>
            </Row>
          </Col>
          <Col span={11} push={1}>
            <Row className={styles.cardHeader}>
              <Col span={15}>Current Medications</Col>
            </Row>
            <Row>
              <Card style={{...antStyle.medicationsCard, ...antStyle.card}}>
                {patientData.medications?.map((medication, i) => {
                  var isLast = false;
                  if (i + 1 === patientData.medications.length) {
                    isLast = true;
                  }
                  return (
                    <>
                      <Row>
                        <Col className={styles.icon} span={1}>
                          <CheckCircleOutlined />
                        </Col>
                        <Col className={styles.itemName} span={18}>
                          {medication.name}
                        </Col>
                        <Col className={styles.itemText} span={5}>
                          {medication.elapsedDays} days ago
                        </Col>
                      </Row>
                      <Row>
                        <p className={styles.medType}>{medication.type}</p>
                        <p className={styles.itemText}> | {medication.date}</p>
                      </Row>
                      {!isLast && <Divider />}
                    </>
                  );
                })}
              </Card>
            </Row>
          </Col>
        </Row>
        <Row className={styles.row2}>
          <Col span={8}>
            <Row className={styles.cardHeader}>Patient Recent Visits</Row>
            <Row>
              <Card style={{ ...antStyle.visitsCard, width: "90%", ...antStyle.card }}>
                {patientData.recentVisits?.map((recentVisit, i) => {
                  var isLast = false;
                  if (i + 1 === patientData.recentVisits.length) {
                    isLast = true;
                  }
                  return (
                    <>
                      <Row>
                        <Col className={styles.itemName} span={22}>
                          {recentVisit.name}
                        </Col>
                        <Col className={styles.itemText} span={2}>
                          <a>
                            <u>View</u>
                          </a>
                        </Col>
                      </Row>
                      <Row>
                        <Col className={styles.itemText} span={15}>
                          {recentVisit.speciality}
                        </Col>
                        <Col className={styles.recentVisitDate} span={9}>
                          {recentVisit.date}
                        </Col>
                      </Row>
                      {!isLast && <Divider />}
                    </>
                  );
                })}
              </Card>
            </Row>
          </Col>
          <Col span={6}>
            <Row className={styles.cardHeader}>Allergies or Sensitivies</Row>
            <Row>
              <List
                style={{ width: "80%", background: "white", padding: "0px 20px", margin: "0px", ...antStyle.card}}
                dataSource={patientData.allergies}
                renderItem={(item) => (
                  <List.Item className={styles.itemText}>
                    {capitalize(item)}
                  </List.Item>
                )}
              />
            </Row>
          </Col>
          <Col span={8}>
            <Row className={styles.cardHeader}>
              Major Procedures / Surguries
            </Row>
            <Row>
              <Card style={{ marginLeft: "0", width: "85%", ...antStyle.card }}>
                {patientData.procedures?.map((procedure, i) => {
                  var isLast = false;
                  if (i + 1 === patientData.procedures.length) {
                    isLast = true;
                  }
                  return (
                    <>
                      <Row className={styles.itemName}>
                        {procedure.procedureName}
                      </Row>
                      <Row>
                        <Col className={styles.itemText} span={16}>
                          {procedure.date}
                        </Col>
                        <Col className={styles.itemText} span={8}>
                          {procedure.elapsedTime} years ago
                        </Col>
                      </Row>
                      {!isLast && <Divider />}
                    </>
                  );
                })}
              </Card>
            </Row>
          </Col>
        </Row>
        <Row>
          <div>
            <Col span={12}><IntakeForms handleFormVisible={props.props.handleFormVisible}/></Col>
          </div>
        </Row>
      </Col>
    </>
  );
}

export default Dashboard;
