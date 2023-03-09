import './ViewSolution.styles.scss';
import * as React from 'react';
import { API } from "aws-amplify";
import {  getSolution, listAttachements, listFeatures } from "../../../graphql/queries";
import Attachment from './components/attachment/attachment.component';
import Feature from './components/feature/feature.component';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const YTembed = ({link}) => {
    return (
        <iframe className='iframe' src={link}></iframe>
    )
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
const ViewSolution = ({id, updateFooter}) => {

    const [solution , setSolution] = React.useState([{}]);
    const [attachments, setAttachments] = React.useState([]);
    const [features, setFeatures] = React.useState([]);
    const getData = async () => {
        await API.graphql
        ({
            query: getSolution,
            variables: { id: id }
        }).then((response) => {
            setSolution(response.data.getSolution);
            updateFooter(response.data.getSolution);
        });
        
        await API.graphql({
    query: listAttachements,
    variables: {filter: {solutionID: {contains: id}}},
    }).then((response) => {
        let attachmentArr = response.data.listAttachements.items;
        setAttachments(attachmentArr);
    });
    await API.graphql({
    query: listFeatures,
    variables: {filter: {solutionID: {contains: id}}},
}).then((response) => setFeatures(response.data.listFeatures.items));

    }

    React.useEffect(() => {
        getData();
    }, [])

    React.useEffect(() => {
        console.log(features)
        
    }, [features])
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [languages, setLanguages] = React.useState([]);
    React.useEffect(() => {
        if(solution.language) {
            try {
            for(let x = 0; x < solution.lanugage.length; x++) {
                setLanguages(languages => [...languages, solution.language[x]]);
            }
        } catch {
            setLanguages(['none'])
        }
        }
    }, [solution])

    return (
        <div className="vs-container">
            
            <div className="vs-col">
            <div className="content">
            <div className="about"><Paper sx={{height: '100%', padding: '5px'}} elevation={3}>
            <h4 className="vs-title">Description</h4>
                {solution.description? solution.description : "none"}
                
                </Paper></div>
            <div className="about"><Paper sx={{height: '100%', padding: '5px'}} elevation={3}>
            <h4>Generalization</h4>
                {solution.generalization? solution.generalization : "none"}
                
                </Paper></div>
            <div className="about"><Paper sx={{height: '100%', padding: '5px'}} elevation={3}>
            <h4>Owner</h4>
                {solution.owner? solution.owner : 'none'}
                <h4>Github</h4>
                <code>{solution.repo? solution.repo : "none"}</code>
                <h4>Languages</h4>
                {languages.map((language) => {
                    return `${language} `
                })}
                </Paper></div>
            </div>
            </div>
            <div className="vs-col">
                <div className="vs-col-row">
               
                <h3 className="vs-title">Features</h3>
                    <Feature features={features} />
                </div>
                <div className="vs-col-row">
                <h3 className="vs-title">Attachments</h3>
                </div>
            </div>
        </div>
    )
}
export default ViewSolution