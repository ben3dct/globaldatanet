import * as React from "react";
import './ListBox.styles.scss';
const ListBox = (props) => {
  const { mapArray } = props;
  let array = Object.keys(mapArray);

  return (
    <div className="main-contents-box">
      {array.map((property, index) => {
        return (
          <div className="property-value-row">
            <div className="property">{property}</div>
            <div className="value">{mapArray[property]}</div>
          </div>
        );
      })}
    </div>
  );
};
export default ListBox;
