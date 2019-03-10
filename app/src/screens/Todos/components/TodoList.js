import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, TouchableOpacity, Dimensions,Alert } from 'react-native';
import { Container, Content, Header, Body, Title, Button, Left, Icon, Right } from 'native-base';

import connect from 'react-redux/lib/connect/connect';
// import { Content } from 'native-base';
// import translate from 'react-i18next/dist/commonjs/translate';
import { translate } from 'react-i18next'
import compose from 'recompose/compose';
import dataHandler from '../../AddTodo/dataHandler';
import pure from 'recompose/pure';
import { reduxForm } from 'redux-form';
// import bindActionCreators from 'redux/lib/bindActionCreators';
import { bindActionCreators } from 'redux'
import * as TodoActions from '../../../redux/todo/actions';
import AddTodoForm from './../../AddTodo/components/Form';
import withBackButton from '../../../common/hoc/withBackButton';
import withIcons from '../../../common/hoc/withIcons';

import TodoItem from './TodoItem';
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
});

const { height } = Dimensions.get('window');
const enhance = compose(translate(null, { translateFuncName: 'translate' }),
    connect(null, mapDispatchToProps),
    reduxForm({ form: 'todo' }),
    withBackButton(),
    pure, withIcons());

@enhance
export default class TodoList extends React.Component {
    static propTypes = {
        filter: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
        translate: PropTypes.func.isRequired,
        getIcon: PropTypes.func.isRequired,
        toggleTodo: PropTypes.func.isRequired,
        removeTodo: PropTypes.func.isRequired,
        navigation: PropTypes.object.isRequired,
        actions: PropTypes.objectOf(PropTypes.func).isRequired
    };

    render() {
        const styles = this.getStyles(this.props);

        let contentView = (
            <Container>
                <Content contentContainerStyle={styles.content}>
                    <AddTodoForm translate={this.props.translate} onSubmit={this.handleSubmit()} />
                </Content>
            </Container>
        );
        let LogoutView = (
            <View style={{ flex: 1, height: height - 180 }}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>
                        Logout
                        </Text>
                </TouchableOpacity>
            </View>
        );
        if (this.props.items.length > 0) {
            this.props.filter == 'all' ?
                contentView = <FlatList data={this.props.items} renderItem={this.renderTodoItem} />
                :
                LogoutView
        }
        return (
            <Content contentContainerStyle={styles.content}>
                {this.props.filter == 'active' ? contentView : this.props.filter == 'complete' ? LogoutView : <FlatList data={this.props.items} renderItem={this.renderTodoItem} />}
            </Content>
        );
    }

    getStyles = props => ({
        content: {
            justifyContent: 'space-between',
            padding: 8
        },
        inputGroup: {
            flex: 0.9
        },
        text: {
            color: 'red',
        },
        button: {
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'grey',
            left: 0,
            right: 0,
            borderWidth: 0.5,
            height: 40,
            paddingHorizontal: 8,
            backgroundColor: 'transparent', bottom: 0
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
    handleSubmit = () => this.props.handleSubmit(this.submitTodo);

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
            completed: false,
            colors:dataHandler.color
        });
        Alert.alert(
            "Success",
            "Todo Added Successfully!",
            [
                { text: "OK", onPress: () => {console.log('OK Pressed')} },
            ],
            { cancelable: false }
        )
    };
    renderTodoItem = ({ item }) =>
        <TodoItem
            key={item.key}
            title={item.title}
            colors={item.colors}
            isCompleted={item.completed}
            description={item.description}
            toggle={() => this.props.toggleTodo(item.key)}
            remove={() => this.props.removeTodo(item.key)}
            toggleMessage={this.props.translate('is-completed')}
            removeMessage={this.props.translate('remove-todo')}
        />;
}
