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
        tinyUrlInput: "",
        submitURLError: "",
        urls: []
    };

    componentDidMount(){
        axios.get('/urls')
        .then(res => {
            res.data.sort( (a,b) => {
                if (a.url_id < b.url_id) return -1;
                if (a.url_id > b.url_id) return 1;
                return 0;
            });
            this.setState({urls: res.data})
        })
        .catch(err => console.log(err)) 
    }

    handleFieldChange = (inputName, e) => {
        this.setState({[inputName]: e.target.value, submitURLError: ""})
    }

    submit = () => {
        //validate Tiny url is unique
        if ( this.state.urls.find( ({tiny_url}) => tiny_url == this.state.tinyUrlInput) ) {
            this.setState({submitURLError: 'This tiny url is already being used'})
            console.log('this url is being used')
            return 0;
        }

        if(validateURL(this.state.longUrlInput)){
            axios.post('/urls', {longURL: this.state.longUrlInput, tinyURL: this.state.tinyUrlInput})
            .then(res => this.setState({
                urls: [...this.state.urls, res.data],
                longUrlInput: "",
                tinyUrlInput: ""
            }))
        }
    }

    render() {
        return (
            <div style={styles.flexContainer}>
                <h1>Teensy Weensy tiny url generator</h1>
                <p style={{width: '50%', textAlign: 'center'}}>
                    Enter the longform url you wish to see converted into a tiny url.  
                    You may optionally enter a custom tiny url.  If left blank a default will be used.
                </p>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    <TextField 
                        name="longUrlInput" 
                        value={this.state.longUrlInput} 
                        style={{marginRight: '5px'}}
                        onChange={e => this.handleFieldChange("longUrlInput", e)}
                        hintText="long url" />

                     <TextField 
                        name="tinyUrlInput" 
                        value={this.state.tinyUrlInput} 
                        onChange={e => this.handleFieldChange("tinyUrlInput", e)}
                        hintText="desired tiny url" />

                    <input
                        type="button" 
                        onClick={() => this.submit(this.state)}
                        value="Make Url"
                        style={styles.button}
                        onMouseEnter={e => e.target.style.backgroundColor = 'rgb(245,245,245)'}
                        onMouseLeave={e => e.target.style.backgroundColor = 'inherit'}
                    />
                </div>
                {this.state.submitURLError ? (
                    <div style={{color: 'red'}}>{this.state.submitURLError}</div> )
                : null}
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