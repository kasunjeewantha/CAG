import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, SetIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Welcome',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
    ]);
  }, []);

  const onSend = message => {
    getBotResponse(message[0].text);
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, message);
    });
  };

  const sendBotResponse = text => {
    let msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Bot',
      },
    };
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, [msg]);
    });
  };

  const getBotResponse = async message => {
    SetIsTyping(true);
    console.log('user', message);
    axios
      .post('https://cag.onrender.com/api/df_text_query', {
        text: message,
      })
      .then(function (response) {
        console.log('bot', response.data.fulfillmentText);
        sendBotResponse(
          response.data.fulfillmentText.replace(/<\/?[^>]+>/gi, ' '),
        );
        SetIsTyping(false);
      })
      .catch(function (error) {
        console.log(error.message);
        sendBotResponse(error.message);
        SetIsTyping(false);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/png/pronto-p.png')}
        resizeMode="contain"
        style={styles.image}>
        <GiftedChat
          messages={messages}
          isTyping={isTyping}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
            name: 'User',
          }}
          showUserAvatar={true}
        />
      </ImageBackground>
    </View>
  );
};

export default Home;
