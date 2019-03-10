import React from 'react';
import PropTypes from 'prop-types';
import {Image,TouchableOpacity,Text} from 'react-native'
import { Container,View, Content,Form, Header, Body, Title, Button, Left, Icon, Right } from 'native-base';
// import bindActionCreators from 'redux/lib/bindActionCreators';
import { bindActionCreators } from 'redux'
// import translate from 'react-i18next/dist/commonjs/translate';
import { translate } from 'react-i18next'
import connect from 'react-redux/lib/connect/connect';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import { Field } from 'redux-form';
import { reduxForm } from 'redux-form';

import AddTodoForm from './components/Form';
import withBackButton from '../../common/hoc/withBackButton';

import * as TodoActions from '../../redux/todo/actions';
import TextInput from '../AddTodo/components/TextInput';

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});


const enhance = compose(
    connect(null, mapDispatchToProps),
    reduxForm({ form: 'todo' }),
    withBackButton(),
    translate(null, { translateFuncName: 'translate' }),
    pure
);

@enhance
export default class AddTodo extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
        }
    }
    static propTypes = {
        translate: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        actions: PropTypes.objectOf(PropTypes.func).isRequired
    };
    todo=(props)=>{
        props.navigation.navigate('Todos')
    }
    render() {
        const styles = this.getStyles(this.props);

        return (
            <Container >
             <View>
               <View style={{height:'50%',alignItems:'center',justifyContent:'center'}}> 
                <Image source={require('../../../res/images/logo.png')} style={{ width: 160, height: 160 }} />
                    
               </View>
               {/* <View style={{height:'50%',alignItems:'center',justifyContent:'center'}}>  */}
                {/* <Image source={require('../../../res/images/logo.png')} style={{ width: 160, height: 160 }} /> */}
                    {/* <View style={{width:'100%',height:50,backgroundColor:'red',marginTop:'20%'}}> */}
                   <Form>
                    <Field
                 style={{borderWidth:0.5,opacity:8,borderColor:'grey',marginTop:'2%'}}
                    name="Name"
                    component={TextInput}
                    placeholder="Name"
                />
                   
                    {/* </View> */}
                    <Button onPress={() => this.todo(this.props)}  style={styles.button} primary full>
                    <Body>
                        <Text style={styles.text}>
                           Login
                        </Text>
                    </Body>
                </Button>
                </Form>
               {/* </View> */}
                </View>
            </Container>
        );
    }

    getStyles = props => ({
        content: {
            justifyContent: 'space-between',
         
            padding: 8
        },
        button: {
            height: 40,
            width:'80%',
            marginLeft:'10%',
            paddingHorizontal: 8,
            backgroundColor: '#04dc6c',
            marginTop: 8
        },
        inputGroup: {
            flex: 0.9
        },
        header: {
            backgroundColor: '#04dc6c'
        },
        title: {
            color: '#FFFFFF'
        },
        icon: {
            color: '#FFFFFF'
        }
    });

    handleSubmit = () => this.props.navigation.navigate('Home');

    goBack = _ => this.props.navigation.goBack();

    submitTodo = values => {
        if (Object.keys(values).length !== 2) {
            alert(this.props.translate('form'));
            return;
        }

        this.props.actions.addTodo({
            key: Date.now(),
            title: values.title,
            description: values.description,
            completed: false
        });

        this.props.navigation.goBack();
    };
}
