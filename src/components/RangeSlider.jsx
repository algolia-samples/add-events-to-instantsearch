import React from 'react';
import PropTypes from 'prop-types';
import { useRange } from 'react-instantsearch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function RangeSlider({ attribute, min, max }) {
  const { start, range, canRefine, refine } = useRange({
    attribute,
    min,
    max,
  });

  const [values, setValues] = React.useState([
    start[0] ?? min,
    start[1] ?? max,
  ]);

  React.useEffect(() => {
    setValues([start[0] ?? min, start[1] ?? max]);
  }, [start, min, max]);

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  const handleAfterChange = (newValues) => {
    refine([newValues[0], newValues[1]]);
  };

  const handleReset = () => {
    const resetValues = [range.min ?? min, range.max ?? max];
    setValues(resetValues);
    refine(resetValues);
  };

  const isFiltered = values[0] !== (range.min ?? min) || values[1] !== (range.max ?? max);

  if (!canRefine) {
    return null;
  }

  return (
    <div className="custom-range-slider">
      <Slider
        range
        min={range.min ?? min}
        max={range.max ?? max}
        value={values}
        onChange={handleChange}
        onChangeComplete={handleAfterChange}
        step={1}
      />
      <div className="range-slider-values">
        <span className="range-slider-value">${values[0]}</span>
        {isFiltered ? (
          <button
            className="range-slider-reset"
            onClick={handleReset}
            type="button"
          >
            Reset
          </button>
        ) : (
          <span className="range-slider-separator">-</span>
        )}
        <span className="range-slider-value">${values[1]}</span>
      </div>
    </div>
  );
}

RangeSlider.propTypes = {
  attribute: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
