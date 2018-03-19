import React from 'react'
import {Route, Link, withRouter} from 'react-router-dom'
import TextField from 'material-ui/TextField'
import GridList from 'material-ui/GridList'
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
// import api from './apis/MockApis'

const styles = {
    flexContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    gridList: {
        width: 700,
        height: 10,
        border: "1px solid lightgrey"
    }
};

const data = [
    {
        tinyUrl: "www.tinytest.com",
        longUrl: "www.longtest.com",
        count: 213
    }
]

export default class Main extends React.Component{
    state = {
        longUrlInput: ""
    };


    componentDidMount(){

    }

    handleFieldChange = (inputName, e) => {
        this.setState({[inputName]: e.target.value})
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
                    <RaisedButton 
                        onClick={() => this.submit(this.state)}
                        label="Make Url"
                        style={{marginLeft: "20px"}}
                    />
                </div>
                <br/>
                <Table selectable={false} style={styles.gridList}>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckBox={false}
                        enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn style={{paddingLeft: "12px"}}>Tiny Url</TableHeaderColumn>
                            <TableHeaderColumn>Long Url</TableHeaderColumn>
                            <TableHeaderColumn>Number of Hits</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        showRowHover={false}
                    >
                        {data.map((value, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableRowColumn style={{textAlign: "center"}}>
                                        <a href="www.google.com">google</a>
                                    </TableRowColumn>
                                    <TableRowColumn style={{textAlign: "center"}}>
                                        hardcoded
                                    </TableRowColumn>
                                    <TableRowColumn style={{textAlign: "center"}}>
                                        4
                                    </TableRowColumn>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <div style={{ width: "70vw", border: "3px solid green", display: "flex", justifyContent: "center" }}>
                    {/* <Route exact={true} path="/" render={() => (
                        <h1>Faces Admin</h1>
                    )} />
                    <Route path="/add-tenant" component={AddTenant} />
                    <Route path="/edit-tenant/:tenantId/:tenantName" component={EditTenant} /> */}
                </div>
            </div>

        )
    }
}

function UrlTable (data){
    return data.map(() => {
        <div>

        </div>
    })
}