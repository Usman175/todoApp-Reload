import React from 'react';
import PropTypes from 'prop-types';
import { Platform,View,TouchableOpacity } from 'react-native';
import { Form, Button, Text, Body } from 'native-base';
import { Field } from 'redux-form';

import TextInput from './TextInput';
const colors = [
    {id:1, name: '#1a99e2'},
    {id:2, name: '#D9F8C5'},
    {id:3, name: '#FFB8BF'},
    {id:4, name: '#FBC2F5'},
    {id:5, name: '#FDE8C7'},
];

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         color:''
        }
    }
    static propTypes = {
        translate: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    render() {
        const styles = this.getStyles(this.props);

        return (
            <Form >
            
                <Field
                 style={{borderWidth:0.5,opacity:8,borderColor:'grey',marginTop:'2%'}}
                    name="Name"
                    component={TextInput}
                    placeholder="Name"
                />
               
                <Button onPress={this.props.onSubmit} style={styles.button} primary full>
                    <Body>
                        <Text style={styles.text}>
                           Login
                        </Text>
                    </Body>
                </Button>
            </Form>
        );
    }

    getStyles = props => ({
        button: {
            height: Platform.OS === 'android' ? 50 : 40,
            paddingHorizontal: 8,
            backgroundColor: '#04dc6c',
            marginTop: 8
        },
        text: {
            color: '#FFFFFF'
        },
        ColorLabels:{
            
        }
    });
}
