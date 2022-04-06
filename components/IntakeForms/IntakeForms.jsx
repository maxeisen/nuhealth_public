import SelectionCard from '../../components/SelectionCard/SelectionCard';
import styles from '../../styles/IntakeForms.module.css';

function IntakeForms(props) {

  const selectionCardData = [
    {
      title: 'SAMPLE Form',
      description: 'Signs & symptoms, allergies, medications, past medical history, last oral intake, events of concern.',
      eyebrow: 'Evaluate History',
      actionable: false,
      color: '#9C589D'
    },
    {
      title: 'OPQRST Form',
      description: 'Onset, provocation, quality, radiation, severity, and time.',
      eyebrow: 'Evaluate Pain',
      actionable: true,
      onClick: props.handleFormVisible,
      color: '#40AAB1'
    }
  ]

  return(
    <div>
      <h1 className={styles.title}><b>Intake Forms</b></h1>
      <div className={styles.cardGrid}>
        {selectionCardData.map((data) => {
          return(
            <SelectionCard key={data.title.replace(' ','')} props={data} />
          )
        })}
      </div>
    </div>
  )
}

export default IntakeForms;