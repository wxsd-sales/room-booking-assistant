<script>
	import { onMount } from 'svelte';
	import consultants from "./consultants.json";
	import {sendMessage, call, roomBooking} from './functions';
	import SveltyPicker from 'svelty-picker';
	import {PUBLIC_BACKGROUND_URL} from '$env/static/public';

	let dialog, confDialog;
	let currentDate = new Date();
	onMount( () => {
		document.getElementById("date").setAttribute("min", new Date().toISOString().split("T")[0]);
		dialog = document.getElementById('main-dialog');
		confDialog = document.getElementById('confirmation-dialog');
	})

	async function onSubmit(e) {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data)
		let timestamp = new Date(`${data.date} ${data.time}`).toISOString()
		await roomBooking(timestamp,`Meet with ${data.name}`)
		console.log(currentDate)
		var x = new Date(data.date+" "+data.time+":00");
		let seconds = Math.abs(x.getTime() - currentDate.getTime())/1000;
		console.log(seconds)
		if(seconds-300<0){
			seconds=0;
		}
		else{
			seconds=seconds-300
		}
		console.log(seconds)
		if(data.notification.toLowerCase()=='call'){
			call(`Thanks for scheduling an appointment with MGM. Your desk will be ready on ${data.date} at ${data.time}`, data.phone);
		}
		else{
		sendMessage(`Thanks for scheduling an appointment with MGM. Your desk will be ready on ${data.date} at ${data.time}`, data.phone, data.notification.toLowerCase());
		}
		e.target.reset();
		closeClick();
		showConfDialogClick();
	}

	const showConfDialogClick = () => {
			confDialog['showModal']();
	};

	const showDialogClick = () => {
			dialog['showModal']();
	};

	const closeClick = () => {
		dialog.close();
	};
	const closeConfClick = () => {
		confDialog.close();
	};
</script>
 <body style="background-image: url({PUBLIC_BACKGROUND_URL});">
	<div class="parent">
  <img class="image1" src="https://cdn.glitch.global/187f9a90-a558-4ef0-ae51-13196c7d5a01/mgm_logo.jpg?v=1695244922958" alt="mgm_heading"/>
</div>
	<button class="primary" on:click={() => showDialogClick()}>Schedule an appointment</button>
	<dialog id="main-dialog">
		<form class="content" on:submit|preventDefault={onSubmit}>
			<h4><b>Schedule an appointment</b></h4>

			<hr class="solid">
			<div class="field">
				<label class="label" for="nameLabel">Name</label>
				<div class="control">
					<input class="input" type="text" id="name" name="name" placeholder="Enter your name" required>
				</div>
			</div>
			<div class="field">
				<label class="label" for="phoneLabel">Phone Number</label>
				<div class="control">
					<input class="input" type="text" id="phone" name="phone" placeholder="Enter your phone number" required>
				</div>
			</div>
			<div class="field">
			<label class="label" for="dateLabel">Select Date</label>
			<input class="input bulmaCalendar" id="date" name="date" type="date" data-display-mode="inline" data-color="grey" required>
			</div>
			<div class="field">
			<label class="label" for="timeLabel">Select Time</label>
			<SveltyPicker inputClasses="w3-input w3-border" startDate="07:00" endDate="23:00" placeholder="--:-- --" required=true inputId="time" name="time" format="hh:ii" displayFormat="HH:ii P"/>

			<small>Office hours are 9am to 6pm</small>
			</div>
			<div class="field">
			<label class="label" for="notLabel">Select Notification Method</label>
			<div class="select is-fullwidth" >
				<select name="notification" id="notification" required>
					
					<option>SMS</option>
					<option>Call</option>
					<option>WhatsApp</option>
				</select>
			</div>
			</div>
			<hr class="solid">
			<div class="columns is-multiline is-mobile">
				<div class="column">
					<button type="submit" class="button is-success is-rounded is-fullwidth" >Submit</button>
				</div>
				<div class="column">
					<button type="reset" class="button is-danger is-outlined is-rounded is-fullwidth" on:click={closeClick}>Cancel</button>
				</div>
			</div>
		</form>
	</dialog>
	<dialog id="confirmation-dialog">
		<div class="content">
			<h3>
				Thank you! Your appointment is now scheduled!
			</h3>
			<p>
				Please check your whatsapp for the link to join your meeting with the consultant.
			</p>
			<button class="button is-danger is-outlined is-rounded" on:click={closeConfClick}>Close</button>
		</div>
	</dialog>
</body>
<svelte:head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma-calendar@6.1.14/dist/css/bulma-calendar.min.css">
	<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<style>
	:root {
		padding: 10px;
	}
	dialog {
		border-radius: 5px;
		width: 80%;
		transition: all 2s;
		background-color: white;
	}
	dialog::backdrop {
		background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7));
		animation: fade-in 1s;
	}
	hr.solid {
		border-top: 3px solid #bbb;
	}
	:global(body){
		height:100%;
		width: 100%;
		position: absolute;
		background-size: cover;
		top: 0;
		right:0;     
    }
	.primary{
		position: absolute;
		right:    0;
		bottom:   0;
		margin-right:3rem;
		background-color: #9abfb5;
		border-radius: 12px;
		border: none;
		color: white;
		padding: 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		cursor: pointer;
		margin-bottom:3rem;
	}
	
	@keyframes fade-in 
	{
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>