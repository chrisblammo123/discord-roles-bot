/*
 * Discord Bot invite link
 * https://discordapp.com/oauth2/authorize?client_id=507957137465540629&scope=bot&permissions=470019159
 */

const Discord = require('discord.js');        //Discord bot API
const client = new Discord.Client();          //Discord bot client


const config = require('./config.json');      //Data relating to the discord bot
const channelInfo = require('./channels.json');      //Data relating to the discord bot
const roleList = require('./roles.json');      //Data relating to the discord bot



// Initialization


//Triggered when the bot is started up.
client.on('ready', () => {
	console.log('-----Starting Bot-----');
	//Prints when the bot connects and its name
	console.log('Connected as ' + client.user.tag + '\n');
});

// Main

//Triggered when the someone sends a message in a server that the bot is active in.
client.on('message', (message) => {
	//Prevents the bot from responding to messages from bots or ones that do not start with the prefix.
	if (message.author.bot)
	{return;}

	//Tests to see if a message starts with the prefix
	if (message.content.startsWith(config.prefix))
	{
		//Main command processing.
		let msg = message.content.substr(1).split(' '); //Removes the ! and splits based on each space
		let cmd = msg[0].toLowerCase(); // The first word directly after the exclamation is the command
		let args = msg.slice(1); // All other words are arguments/parameters/options for the command

		console.log('Command received: ' + cmd);
		console.log('Arguments: ' + args); // There may not be any arguments

		switch (cmd)
		{
      case "test":
			case 'ping':
				message.author.send('Pong!')
					.then(console.log)
					.catch(console.error);
				break;
			case 'github':
			case 'repo':
				message.channel.send('https://github.com/chrisblammo123/CSGO-Server-Stats-Testing')
					.then(console.log)
					.catch(console.error);
				break;
			case 'info':
      case 'help':
				message.author.send('React to the given messages for your roles. For more info, visit the github repo, or view the role list')
					.then(console.log)
					.catch(console.error);
        break;
      case "role":
      case "roles":
				// TODO: Display role list JSON
        break;
			default:
				message.channel.send(`Invalid command, try ${config.prefix}info|help or check the repo ${config.prefix}github|repo`)
					.then(console.log)
					.catch(console.error);
				break;
		}
	}
});


//client.on('raw', console.log);


// client.channels.cache.get(channelInfo.channelID).messages.fetch(channelInfo.messageID);

//(channelInfo.channelID).messages.fetch(channelInfo.messageID, true);




// //Creates events to use for uncached messages, and such.
// client.on('raw', (packet) => {
// 	//Removes unnecessary packets
// 	let validPackets = ['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE']; // might need to expand, so I created this for now
// console.log(!validPackets.includes(packet.t))
// 	if (!validPackets.includes(packet.t)) return;

// 	// Gets the channel to check for the message
// 	let packetChannel = client.channels.get(packet.d.channel_id);

// 	// Checks to see if the message cached in the channel, otherwise it continues
// 	if (packetChannel.messages.has(packet.d.message_id)) return;

// 	// Fetch the message, since it is not cached
// 	packetChannel.message.fetch(packet.d.message_id)
// 		.then(message => {
// 			// Checks the emoji from the packet and creates a variable identifier for it
// 			let packetEmoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
// console.log(`packetEmoji: ${packetEmoji}`);
// 			// Checks to see if the message has that reaction
// 			let packetReaction = message.reactions.get(packetEmoji);
// console.log(`packetReaction: ${packetReaction}`);
// 			// Adds the currently reacting user to the reaction's users collection.
// 			if (packetReaction) packetReaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));

// 			// Chooses the correct event type and emits it
// 			if (packet.t == 'MESSAGE_REACTION_ADD') {
// 				client.emit('messageReactionAdd', packetReaction, client.users.get(packet.d.user_id));
// 				console.log('add');
// 			}
// 			else if (packet.t == 'MESSAGE_REACTION_REMOVE') {
// 				client.emit('messageReactionRemove', packetReaction, client.users.get(packet.d.user_id));
// 				console.log('remove');
// 			}
// 		});
// });








client.on('messageReactionRemove', (reaction, user) => {
	console.log(`REMOVED:\nreaction: ${reaction} and user: ${user}`);
});

client.on('messageReactionAdd', (reaction, user) => {
	console.log(`ADDED:\nreaction: ${reaction} and user: ${user}`);
});


/*
// Example Packet
{ t: 'MESSAGE_REACTION_ADD',
  s: 11,
  op: 0,
  d:
   { user_id: '233679110692405249',
     message_id: '775542864943513624',
     member:
      { user: [Object],
        roles: [Array],
        mute: false,
        joined_at: '2017-09-02T00:30:45.238000+00:00',
        hoisted_role: '443121113212387349',
        deaf: false },
     emoji: { name: '💯', id: null },
     channel_id: '504285553097965578',
     guild_id: '353335908038213655' } } 0
*/



//Secret token for the bot, defined in the config.json file.
client.login(config.token);