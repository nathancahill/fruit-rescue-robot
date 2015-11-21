
import L from 'leaflet'
import Handlebars from 'handlebars'
import nanoajax from 'nanoajax'
import Parse from 'parse'
import Split from 'split.js'
import Pikaday2 from 'pikaday2'

Parse.initialize("jfEekOu1UDd6u7ugQdNYvApXPiWO704gZtirmhH2", "Rs6cdM9lQr7t0vVQpXjRN4lo4oVRlCCLL00M0KG9");

Split(['#map', '#list'], {
    sizes: [80, 20],
    minSize: [200, 300]
})

$('.flyout-btn').click(() => {
    $('.flyout-btn').toggleClass('btn-rotate');
    $('.flyout').find('a').removeClass();
    return $('.flyout').removeClass('flyout-init fade').toggleClass('expand');
});

$('.flyout').find('a').click(() => {
    $('.flyout-btn').toggleClass('btn-rotate');
    $('.flyout').removeClass('expand').addClass('fade');
    return $(this).addClass('clicked');
})

$('.popup-link').click(function (e) {
    e.preventDefault()
    console.log($(this).attr('href'))
    $('.modal').hide()
    $($(this).attr('href')).show()
})

$('.modal .leaflet-popup-close-button').click(function (e) {
    e.preventDefault()
    $('.modal').hide()
})

new Pikaday2({
    field: document.getElementById('ripeningdate'),
    format: 'MMM Do'
})

$("#phone").mask("(999) 999-9999")
$("#phone2").mask("(999) 999-9999")
$("#phone3").mask("(999) 999-9999")

const popupTemplate = Handlebars.compile(document.getElementById('popup-template').innerHTML);
const map = L.map('map').setView([40.02, -105.28], 13)
const tileLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'ezwelty.o7g2lf5a',
    accessToken: 'pk.eyJ1IjoiZXp3ZWx0eSIsImEiOiJjaWg4a3pydHQwdGhqdjBraTFuMHl1ZGtwIn0.2IQ6qEI9JLOhEhioS77huA'
}).addTo(map)

const Species = Parse.Object.extend('Species')
const Property = Parse.Object.extend('Property')
const Harvest = Parse.Object.extend('Harvest')
const Tree = Parse.Object.extend('Tree')

let query = new Parse.Query(Species)

query.select(["objectId", "name", "scientific_name"])
query.limit(1300)
query.find({
    success: species => {
        let html = species.map(spec => `<option id="${spec.get('objectId')}">${spec.get('name')} ${spec.get('scientific_name') ? '[' + spec.get('scientific_name') + ']' : ''}</option>`).join('')
        document.getElementById('species').innerHTML = html
    },
    error: error => {
        document.getElementById('species').innerHTML = '<option>Could not load species.</option>'
        console.log(error)
    }
})

query = new Parse.Query(Harvest)
query.find({
    success: harvests => {
        document.getElementById('harvests').innerHTML = ''

        for (let harvest of harvests) {
            harvest.get('property').fetch({
                success: property => {
                    document.getElementById('harvests').innerHTML += `
                        <tr>
                            <td>
                                ${harvest.get('name')}
                                <br>
                                <span style="font-weight: normal">
                                    ${property.get('address')}
                                </span>
                            </td>
                            <td>${moment.utc(harvest.get('date')).format('MMM Do')}</td>
                            <td>
                                <a class="btn btn-sm btn-outline popup-link" href="#joinpopup">
                                    Join
                                </a>
                            </td>
                        </tr>
                    `
                }
            })
        }
    }
})

query = new Parse.Query(Tree)
query.find({
    success: trees => {
        for (let tree of trees) {
            let latlng = tree.get('latlng')

            tree.get('species').fetch({
                success: species => {
                    L.circleMarker([latlng.latitude, latlng.longitude], {radius: 7, fillColor: '#6CC644', fillOpacity: 1})
                        .addTo(map)
                        .bindPopup(popupTemplate({
                            title: species.get('name'),
                            date: moment.utc(tree.get('harvest_date')).format('MMM Do'),
                            yield: tree.get('harvest_pounds'),
                            height: tree.get('height_feet'),
                            sprayed: tree.get('sprayed')
                        }))
                }
            })
        }
    }
})

let currentUser = Parse.User.current();
let signoutUI = () => {
    document.getElementById('unauthenticated').style.display = 'block'
    document.getElementById('authenticated').style.display = 'none'
}
let signinUI = () => {
    document.getElementById('unauthenticated').style.display = 'none'
    document.getElementById('authenticated').style.display = 'block'
}

if (currentUser) {
    signinUI()
} else {
    signoutUI()
}

document.getElementById('signout').addEventListener('click', (e) => {
    e.preventDefault()

    Parse.User.logOut()

    signoutUI()
})

let signinForm = document.querySelector('#signin form')

let signin = (e) => {
    e.preventDefault()

    Parse.User.logIn(signinForm.email.value, signinForm.password.value, {
        success: user => {
            signinUI()
            signinForm.reset()
            $('.modal').hide()
        },
        error: (user, error) => {

        }
    })
}

signinForm.addEventListener('submit', signin, false)

let signupForm = document.querySelector('#signup form')

let signup = (e) => {
    e.preventDefault()

    let user = new Parse.User()
    user.set('username', signupForm.email.value)
    user.set('email', signupForm.email.value)
    user.set('password', signupForm.password.value)
    user.set('fullname', signupForm.fullname.value)

    user.signUp(null, {
        success: user => {
            signinUI()
            signupForm.reset()
            $('.modal').hide()
        },
        error: (user, error) => {

        }
    })
}

signupForm.addEventListener('submit', signup, false)








