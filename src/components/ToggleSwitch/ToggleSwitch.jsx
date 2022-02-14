import PropTypes from "prop-types";
import styles from "./ToggleSwitch.module.scss";

const ToggleSwitch = ({
  id,
  checked,
  onChange,
  optionLabels,
}) => {
  return (
    <div className={styles.toggleSwitch}>
      <input checked={checked} className={styles.checkbox} id={id} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      <label className={styles.label} htmlFor={id}>
        <span
          className={styles.inner}
          data-no={optionLabels[1]}
          data-yes={optionLabels[0]}
        />
        <span
          className={styles.switch}
        />
      </label>
    </div>
  );
};

ToggleSwitch.defaultProps = {
  optionLabels: ["Yes", "No"]
};

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  optionLabels: PropTypes.arrayOf(PropTypes.string),
};

export default ToggleSwitch;
