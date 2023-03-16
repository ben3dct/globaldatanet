import * as React from 'react';
import './Box.styles.css';

const CustomBox = (props) => {
    const {title, content, icon} = props;
    return (
        <div className="box-main">
          <div className="box-label">
            <span className="box-label-title">{title}</span>
            <span className="box-label-icon">{icon}</span>
          </div>
          <div className="box-contents">{content}</div>
        </div>
      );
}
export default CustomBox;