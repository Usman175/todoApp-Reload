import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card, CardItem, Text, CheckBox, Left, Body, Right } from 'native-base';
import Swipeout from 'react-native-swipeout';

export default class TodoItem extends React.Component {
    static propTypes = {
        size: PropTypes.number.isRequired,
        isCompleted: PropTypes.bool.isRequired,
        color: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        removeMessage: PropTypes.string.isRequired,
        toggleMessage: PropTypes.string.isRequired,
        iconName: PropTypes.string.isRequired,
        toggle: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired
    };

    static defaultProps = {
        color: '#04dc6c',
        iconName: 'delete',
        size: 20
    };

    render() {
        const styles = this.getStyles(this.props);

        return (
            <View style={{ flex: 1 }}>
                <Swipeout

                    right={[
                        {
                            text: "Delete",
                            backgroundColor: 'red',
                            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                            onPress: this.props.remove
                        }
                    ]}
                    left={[
                        {
                            text: "Complete",
                            backgroundColor: 'green',
                            underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                            onPress: this.props.toggle
                        }
                    ]}
                    backgroundColor={'transparent'} autoClose={true}  >

                    <Card style={styles.card}>
                        <CardItem header>
                            <View style={{ height: 15, marginRight: '2%', width: 15, backgroundColor: this.props.colors, borderRadius: 50 }}></View>

                            <View>
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    style={{ ...styles.text, flex: 1, fontSize: 22, color:this.props.isCompleted ? 'grey' : 'black', textDecorationLine: this.props.isCompleted ? 'line-through' : null, textDecorationStyle: this.props.isCompleted ? 'solid' : null }}
                                >
                                    {this.props.title}
                                </Text>
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    style={{ ...styles.text, flex: 1, fontSize: 15, color: 'grey' }}
                                >
                                    {this.props.title}
                                </Text>
                            </View>
                        </CardItem>

                    </Card>

                </Swipeout>
            </View>
        );
    }

    getStyles = props => ({
        card: {
            borderRadius: 4
        },
        button: {
            marginTop: 3
        },
        checkbox: {
            left: 0
        },
        text: {
            color: props.color,
            marginLeft: 8
        }
    });
}
