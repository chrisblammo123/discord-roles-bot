/*
 * Discord Bot invite link
 * https://discordapp.com/oauth2/authorize?client_id=507957137465540629&scope=bot&permissions=470019159
 */

const Discord = require('discord.js');        // Discord bot API
const client = new Discord.Client({						// Discord bot client
	partials: ['MESSAGE', 'REACTION']												// Allows for the bot to read messages that are not cached
});


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
				message.channel.send('https://github.com/chrisblammo123/discord-roles-bot')
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



client.on('messageReactionAdd', async (reaction, user) => {
	// Function that handles giving the user the selected role
	let giveRole = async () => {
		// Gets information from the reaction event trigger
		let emojiName = reaction.emoji.name;									// TODO: allow it to see multiple emojis, either using JSON or array (maybe something else?)
		let role = reaction.message.guild.roles.cache.get(roleList.Jackbox);
		let member = reaction.message.guild.members.cache.find(member => member.id == user.id);

		console.log(`${emojiName}\n${role.name}\n${member.id}`)

		try
		{
			if (role && member)
			{
				console.log('Role and member found.')
				await member.roles.add(role);
			}
		}
		catch (err)
		{
			console.error(err);
		}
	};

	// Checks if the message is a partial (i.e. it has not been cached)
	if (reaction.message.partial)
	{
		try
		{
			let msg = await reaction.message.fetch();
			if (msg.id == channelInfo.messageID)
			{
				console.log('Cached message.');
				giveRole();
			}
		}
		catch (err)
		{
			console.error(err);
		}
	}
	else
	{
		console.log('Not a parital.');
		if (reaction.message.id == channelInfo.messageID)
		{
			console.log('yep');
			giveRole();
		}
	}
});

client.on('messageReactionRemove', async (reaction, user) => {
	// Function that handles taking the specified role from the user
	let takeRole = async () => {
		// Gets information from the reaction event trigger
		let emojiName = reaction.emoji.name;									// TODO: allow it to see multiple emojis, either using JSON or array (maybe something else?)
		let role = reaction.message.guild.roles.cache.get(roleList.Jackbox);
		let member = reaction.message.guild.members.cache.find(member => member.id == user.id);

		console.log(`${emojiName}\n${role.name}\n${member.id}`)

		try
		{
			if (role && member)
			{
				console.log('Role and member found.')
				await member.roles.remove(role);
			}
		}
		catch (err)
		{
			console.error(err);
		}
	};

	// Checks if the message is a partial (i.e. it has not been cached)
	if (reaction.message.partial)
	{
		try
		{
			let msg = await reaction.message.fetch();
			if (msg.id == channelInfo.messageID)
			{
				console.log('Cached message.');
				takeRole();
			}
		}
		catch (err)
		{
			console.error(err);
		}
	}
	else
	{
		console.log('Not a parital.');
		if (reaction.message.id == channelInfo.messageID)
		{
			console.log('yepper');
			takeRole();
		}
	}
});




// client.on('messageReactionRemove', (reaction, user) => {
// 	console.log(`REMOVED:\nreaction: ${reaction} and user: ${user}`);
// });

// client.on('messageReactionAdd', (reaction, user) => {
// 	console.log(`ADDED:\nreaction: ${reaction} and user: ${user}`);
// });




//Secret token for the bot, defined in the config.json file.
client.login(config.token);