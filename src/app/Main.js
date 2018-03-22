import React from 'react'
import axios from 'axios'
import {Route, Link, withRouter} from 'react-router-dom'
import TextField from 'material-ui/TextField'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const styles = {
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    table: {
        width: 900,
        height: 10,
        border: "1px solid lightgrey"
    },
    button: {
        marginLeft: "20px", 
        borderRadius: "4px",
        fontSize: "10pt",
        boxShadow: "1px 0px 4px 0px grey",
        cursor: "pointer"
    }
};

export default class Main extends React.Component{
    state = {
        longUrlInput: "",
        urls: []
    };

    componentDidMount(){
        axios.get('/urls')
        .then(res => this.setState({urls: res.data}))
        .catch(err => console.log(err)) 
    }

    handleFieldChange = (inputName, e) => {
        this.setState({[inputName]: e.target.value})
    }

    submit = () => {
        console.log('submit button')
        if(validateURL(this.state.longUrlInput)){
            axios.post('/urls', {longURL: this.state.longUrlInput})
            .then(res => this.setState({urls: [...this.state.urls, res.data]}))
        }
    }

    render() {
        return (
            <div style={styles.flexContainer}>
                <h1>Teensy Weensy tiny url generator</h1>
                <p>enter the longform url you wish to see converted into a tiny url</p>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <TextField 
                        name="longUrlInput" 
                        value={this.state.longUrlInput} 
                        onChange={e => this.handleFieldChange("longUrlInput", e)}
                        hintText="long url" />
                    <input
                        type="button" 
                        onClick={() => this.submit(this.state)}
                        value="Make Url"
                        style={styles.button}
                        onMouseEnter={e => e.target.style.backgroundColor = 'rgb(245,245,245)'}
                        onMouseLeave={e => e.target.style.backgroundColor = 'inherit'}
                    />
                </div>
                <br/>
                <div style={styles.table}>
                <Table selectable={false} style={styles.table}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckBox={false}
                        enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn style={{paddingLeft: "12px"}}>
                                Tiny Url
                            </TableHeaderColumn>
                            <TableHeaderColumn>Long Url</TableHeaderColumn>
                            <TableHeaderColumn>Number of Hits</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={false}
                    >
                        {this.state.urls.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableRowColumn style={{textAlign: "center"}}>
                                        <a href={`a/${value.tiny_url}`}>
                                            {`teensy-weensy.herokuapp.com/a/${value.tiny_url}`}
                                        </a>
                                    </TableRowColumn>
                                    <TableRowColumn style={{textAlign: "center"}}>
                                        {value.long_url}
                                    </TableRowColumn>
                                    <TableRowColumn style={{textAlign: "center"}}>
                                        {value.count}
                                    </TableRowColumn>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <br />
                <br />
                <br />
                </div>
            </div>
        )
    }
}

function validateURL(URL){
    // add http:// or https:// if its not there
    // check to make sure URL exists
    return true;
}