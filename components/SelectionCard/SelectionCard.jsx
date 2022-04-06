import { Card } from "antd";
import {
  ArrowRightOutlined
} from "@ant-design/icons";
import styles from "../../styles/SelectionCard.module.css";

function SelectionCard(props) {
  const data = props.props;
  return (
    <Card
      className={styles.card}
      hoverable={data.actionable}
      style={{
        borderLeft: `6px solid ${data.color}`,
        borderRadius: "5px",
      }}
      onClick={data.actionable ? data.onClick : null}
    >
      <div className={styles.cardEyebrow}>
        <p style={{color: data.color}}>{data.eyebrow}</p>
      </div>
      <div className={styles.cardTitle}>
        <span><b>{data.title} </b>{data.actionable && <ArrowRightOutlined className={styles.actionIcon}/>}</span>
      </div>
      <div className={styles.cardDescription}>
        <p>{data.description}</p>
      </div>
    </Card>
  );
}

export default SelectionCard;
