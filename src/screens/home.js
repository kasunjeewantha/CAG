import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';
import Colors from '../styles/colors';
import {IconButton} from 'react-native-paper';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
          avatar: `https://ui-avatars.com/api/?name=B"&color=${Colors.black}&background=${Colors.lighterPurple}`,
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
        avatar: `https://ui-avatars.com/api/?name=B"&color=${Colors.black}&background=${Colors.lighterPurple}`,
      },
    };
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, [msg]);
    });
  };

  const renderBuble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: Colors.black,
          },
          left: {
            color: Colors.black,
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: Colors.lighterPurple,
          },
          right: {
            backgroundColor: Colors.heraBlue,
          },
        }}
        timeTextStyle={{
          right: {color: Colors.black},
          left: {color: Colors.black},
        }}
      />
    );
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton
            icon="send-circle"
            size={35}
            iconColor={Colors.darkPurple}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
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
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../assets/png/pronto-p.png')}
        resizeMode="contain"
        style={styles.image}>
        <GiftedChat
          messages={messages}
          wrapInSafeArea={false}
          isTyping={isTyping}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
            name: 'User',
            avatar: `https://ui-avatars.com/api/?name=U"&color=${Colors.black}&background=${Colors.heraBlue}`,
          }}
          showUserAvatar
          renderBubble={props => renderBuble(props)}
          renderSend={props => renderSend(props)}
          placeholder="Type your message here..."
          scrollToBottomComponent={() => scrollToBottomComponent}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;
