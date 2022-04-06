import styles from '../../styles/OPQRSTForm.module.css';
import {
  Input,
  InputNumber,
  Form,
  Button,
  DatePicker,
} from "antd";

function OPQRSTForm(props) {

  const fieldData = [
    {
      label: 'Days, Hours, Minutes',
      name: 'dhm',
      description: 'The number of days, hours, and minutes that have elapsed since the patier began experiencing the complaint for this call.',
      placeholder: '3 days',
      type: 'input',
    },
    {
      label: 'Onset Date',
      name: 'date',
      description: 'The date when the patient initally experienced the complaint for this call',
      placeholder: 'YYYY-MM-DD',
      type: 'datepicker',
    },
    {
      label: 'Provocation',
      name: 'provocation',
      description: 'A description of any movement, pressure (such as palpatation), or other external factors that make the problem better or worse. This can also include whether the symptoms relieve with rest.',
      placeholder: '',
      type: 'textarea',
    },
    {
      label: 'Quality',
      name: 'quality',
      description: 'The patient\'s description of the pain (sharp, dull, crushing, burning, tearing, or some other feeling, along with the pattern, such as intermittent, constant, or throbbing).',
      placeholder: '',
      type: 'textarea',
    },
    {
      label: 'Radiation',
      name: 'radiation',
      description: 'Where the pain is on the body and whether it radiates (extends) or moves to any other area. This can give indications for conditions such as a myocardial infarction, which can radiate through the jaw and arms. Other referred pains can provide clues to underlying medical causes.',
      placeholder: '',
      type: 'textarea',
    },
    {
      label: 'Severity',
      name: 'severity',
      description: 'The pain score (usually on a scale of 0 to 10).',
      placeholder: '',
      type: 'number',
    }
  ];

  const onFinish = (values) => {
    console.log(values);
  };

  return(
    <div className={styles.formContainer}>
      <h1 className={styles.title}><b>OPQRST</b></h1>
      <p className={styles.fieldDescription}>Keep track of patient information.</p>
      <Form
          name="basic"
          initialValues={{
            dhm: "",
            date: "",
            provocation: "",
            quality: "",
            radiation: "",
            severity: "",
          }}
          onFinish={onFinish}
          autoComplete="off"
          size='large'
          className={styles.search}
        >
          {fieldData.map((data) => {
            return(
              <div key={data.name}>
                <h2 className={styles.fieldTitle}>{data.label}</h2>
                <p className={styles.fieldDescription}>{data.description}</p>
                <Form.Item name={data.name}>
                  {data.type === 'input' &&
                    <Input placeholder={data.placeholder} className={styles.input}/>
                  }
                  {data.type === 'datepicker' &&
                    <DatePicker placeholder={data.placeholder} className={styles.input}/>
                  }
                  {data.type === 'textarea' &&
                    <Input.TextArea placeholder={data.placeholder} className={styles.input}/>
                  }
                  {data.type === 'number' &&
                    <InputNumber min={0} max={10} placeholder={data.placeholder} className={styles.input}/>
                  }
                </Form.Item>
              </div>
            )
          })}

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>
              Save
            </Button>
          </Form.Item>
      </Form>
    </div>
  )
}

export default OPQRSTForm;