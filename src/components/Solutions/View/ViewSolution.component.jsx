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
import Box  from '@mui/material/Box';
import CustomBox from './components/box/Box.component';
import { AiOutlineSolution } from 'react-icons/ai'
import { GoCheck, GoChecklist, GoFile } from "react-icons/go";

import Paper from '@mui/material/Paper';
import ListBox from './components/list-box/ListBox.component';

const YTembed = ({link}) => {
    return (
        <iframe width="560" height="315" src="https://www.youtube.com/embed/-Ur3wwV6RXw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
const ViewSolution = ({id, updateFooter, updateGlobalID}) => {

    const [solution , setSolution] = React.useState([{}]);
    const [attachments, setAttachments] = React.useState([]);
    const [features, setFeatures] = React.useState([]);
    const [listObject, setListObject] = React.useState({});
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
        updateGlobalID(id);
        
    }, [])
    React.useEffect(() => {
        if(solution?.createdAt) {
            createListObject();
        } else {
            return;
        }
       
    }, [solution])
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

    const createListObject = () => {
        let obj = {owner: solution.owner, repo: solution.repo, language: solution.language.toString(), category: solution.category.toString(), services: solution.services.toString()};
        setListObject(obj);
    }
    React.useEffect(() => {
        console.log(listObject);
    }, [listObject])

    return (
      <div className="vs-container">
          <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 'auto',
        },
      }}
    >
     
      <Paper elevation={1} sx={{padding: '10px', border: '0.5px solid black'}}>
        <div className="content-box">
            <Paper sx={{padding: '3px'}} elevation={4}>
            <div className="content-heading">
                <AiOutlineSolution size={40} />
                <span className="content-span">{solution.title && solution.owner? `${solution.title} by ${solution.owner}` : "Oops! This Solution is untitled"}</span>
            </div>
            </Paper>
            <Paper sx={{padding: '3px'}} elevation={2}>
                <div className="first-section">
                    <div className="description-cbox">
                    <CustomBox title="Description" content={solution.description} icon={<GoFile size={20} />}/>
                    </div>
                    <div className="generalization-cbox">
               <CustomBox title="Generalization" content={solution.generalization} icon={<GoChecklist size={20} />}/>
               </div>
               </div>
                <ListBox mapArray={listObject} />
            </Paper>
        </div>
      </Paper>
     
    </Box>
      </div>
    )
}
export default ViewSolution