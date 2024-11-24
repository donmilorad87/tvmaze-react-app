import { expect, test } from 'vitest'
import { render } from 'vitest-browser-react'
import Episode from '../src/components/episode/index.tsx'
import { MemoryRouter } from 'react-router-dom'
import React from 'react';

const episode = {
    "id": 3034923,
    "url": "https://www.tvmaze.com/episodes/3034923/late-night-with-seth-meyers-2024-10-28-molly-shannon-brooks-wheelan",
    "name": "Molly Shannon, Brooks Wheelan",
    "season": 2024,
    "number": 113,
    "type": "regular",
    "airdate": "2024-10-28",
    "airtime": "00:35",
    "airstamp": "2024-10-29T04:35:00+00:00",
    "runtime": 60,
    "rating": {
        "average": null
    },
    "image": null,
    "summary": "<p>Guests include Molly Shannon (<i>Only Murders in the Building</i>) and Brooks Wheelan (<i>Alive in Alaska</i>).</p>",
    "show": {
        "id": 363,
        "url": "https://www.tvmaze.com/shows/363/late-night-with-seth-meyers",
        "name": "Late Night with Seth Meyers",
        "type": "Talk Show",
        "language": "English",
        "genres": [
            "Comedy"
        ],
        "status": "Running",
        "runtime": 60,
        "averageRuntime": 60,
        "premiered": "2014-02-24",
        "ended": null,
        "officialSite": "https://www.nbc.com/late-night-with-seth-meyers",
        "schedule": {
            "time": "00:35",
            "days": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ]
        },
        "rating": {
            "average": 4.4
        },
        "weight": 98,
        "network": {
            "id": 1,
            "name": "NBC",
            "country": {
                "name": "United States",
                "code": "US",
                "timezone": "America/New_York"
            },
            "officialSite": "https://www.nbc.com/"
        },
        "webChannel": null,
        "dvdCountry": null,
        "externals": {
            "tvrage": 35852,
            "thetvdb": 270262,
            "imdb": "tt3513388"
        },
        "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/506/1265488.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/506/1265488.jpg"
        },
        "summary": "<p>Seth Meyers, who is Saturday Night Live's longest serving anchor on the show's wildly popular \"Weekend Update,\" takes over as host of NBC's <b>Late Night</b> — home to A-list celebrity guests, memorable comedy and the best in musical talent.</p><p>As the Emmy Award-winning head writer for \"SNL,\" Meyers has established a reputation for sharp wit and perfectly timed comedy, and has gained fame for his spot-on jokes and satire. Meyers takes his departure from \"SNL\" to his new post at \"Late Night,\" as Jimmy Fallon moves to The Tonight Show.</p>",
        "updated": 1732302568,
        "_links": {
            "self": {
                "href": "https://api.tvmaze.com/shows/363"
            },
            "previousepisode": {
                "href": "https://api.tvmaze.com/episodes/3055110",
                "name": "Rita Moreno, Rachel Zegler"
            },
            "nextepisode": {
                "href": "https://api.tvmaze.com/episodes/3059138",
                "name": "Jim Gaffigan, Allison Tolman"
            }
        }
    },
    "_links": {
        "self": {
            "href": "https://api.tvmaze.com/episodes/3034923"
        },
        "show": {
            "href": "https://api.tvmaze.com/shows/363",
            "name": "Late Night with Seth Meyers"
        }
    }
}

test('renders title', async () => {
    const { getByTestId, getByText, getByRole } = render(<MemoryRouter><Episode episode={episode} /></MemoryRouter>)
    const ep = getByTestId('episode').element()
    await expect(ep).toHaveTextContent(/^Late Night with Seth Meyers/g)
})

test('renders correct rating', async () => {
    const { getByTestId, getByText, getByRole } = render(<MemoryRouter><Episode episode={episode} /></MemoryRouter>)
    const ep = getByTestId('episode').element().getElementsByClassName('ratingStars')[0].getElementsByTagName('img')
    let numberOfFullStars: number = 0
    for (let i = 0; i < 5; i++) {
        if (ep[i].src.includes('/src/assets/fullStar.svg')) {
            numberOfFullStars = numberOfFullStars + 1
        }
        console.log(ep[i].src.includes('/src/assets/fullStar.svg'));

    }

    console.log(ep, numberOfFullStars);

    await expect(numberOfFullStars).toBe(2)
})