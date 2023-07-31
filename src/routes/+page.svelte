<script>
	import { onMount } from 'svelte';
	import consultants from "./consultants.json";
	import {getConsultantDetails,getLinks,} from './functions';
	import SveltyPicker from 'svelty-picker';
	import {PUBLIC_BACKGROUND_URL} from '$env/static/public';

	let dialog, confDialog;
	let currentDate = new Date();
	onMount( () => {
		document.getElementById("date").setAttribute("min", new Date().toISOString().split("T")[0]);
		dialog = document.getElementById('main-dialog');
		confDialog = document.getElementById('confirmation-dialog');
		var select = document.getElementById("consultant");

		for(var i = 0; i < consultants.consultants.length; i++) {
			var opt = consultants.consultants[i].name;
			var el = document.createElement("option");
			el.textContent = opt;
			el.value = opt;
			select.appendChild(el);
		}
	})

	async function onSubmit(e) {
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}
		console.log(data)
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
		var {email,phone}=getConsultantDetails(data.consultant)
		getLinks(email,seconds,phone,data.phone, data.notification)
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
	<button class="primary" on:click={() => showDialogClick()}>Schedule an appointment</button>
	<dialog id="main-dialog">
		<form class="content" on:submit|preventDefault={onSubmit}>
			<h1>Schedule an appointment</h1>
			<hr class="solid">
			<h3>
				Patient Details
			</h3>
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

			<h3>
				Select Date
			</h3>
			<input class="input bulmaCalendar" id="date" name="date" type="date" data-display-mode="inline" data-color="grey" required>
			<h3>
				Select Time
			</h3>
			<SveltyPicker inputClasses="w3-input w3-border" startDate="07:00" endDate="18:00" placeholder="--:-- --" required=true inputId="time" name="time" format="hh:ii" displayFormat="HH:ii P"/>

			<small>Office hours are 9am to 6pm</small>
			<h3>
				Select Request Type
			</h3>
			<div class="select is-fullwidth" >
				<select name="consultant" id="consultant" required>
				</select>
			</div>
			<h3>
				Select Notification Method
			</h3>
			<div class="select is-fullwidth" >
				<select name="notification" id="notification" required>
					<option>WhatsApp</option>
					<option>SMS</option>
				</select>
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
		width: 50%;
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