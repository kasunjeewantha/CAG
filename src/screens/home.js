import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat, Message} from 'react-native-gifted-chat';
import axios from 'axios';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, SetIsTyping] = useState(false);

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
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    };
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, [msg]);
    });
  };

  const getBotResponse = async message => {
    SetIsTyping(true);
    console.log('Messages2', message);
    axios
      .post('https://cag.onrender.com/api/df_text_query', {
        text: JSON.stringify(message),
      })
      .then(function (response) {
        console.log(response.data.fulfillmentText);
        sendBotResponse(JSON.stringify(response.data.fulfillmentText));
        SetIsTyping(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <GiftedChat
      messages={messages}
      isTyping={isTyping}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Home;
