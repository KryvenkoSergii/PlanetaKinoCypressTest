const { _ } = Cypress

describe('planetakino site tests', () => {

    it('Open Cabinet Login Page', () => {
        cy.visit('https://cabinet.planetakino.ua/');
        const user_email = Cypress.env('email');
        const password = Cypress.env('password');
        cy.url().should('include', 'https://cabinet.planetakino.ua/auth');
        cy.get('button.btn-enter').click();
        cy.get('input#loginform-login').type(user_email);
        cy.get('input#loginform-password').type(password);
        cy.get('button.auth-submit').click();
        cy.url().should('include', 'https://cabinet.planetakino.ua/');
        cy.wait(200);
        cy.visit('https://planetakino.ua/lvov2/showtimes/#today');
        cy.wait(400);
        cy.get('section.movies div.movie')
            .get('section.movie-info div.tech')
            .should('contain', '4DX');
        // 
        cy.visit('https://planetakino.ua/lvov2/movies/');
        cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block').its('length').should('be.gt', 0);
        var titles = [];
        // let raitings = [];
        // cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block div.movie-block__flip-back div.movie-block__imdb-rating')
        //             .then(function ($elem) {
        //                 const raiting = $elem.text();
        //                 raitings.push($elem.text()+";");
        //                 raitings.push("end");
        //                 // cy.log($elem.text());
        //                 cy.log(raitings);
        //             });
        cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block div.movie-block__flip-back div.movie-block__imdb-rating')
            .then(function ($elem) {
                cy.log("array length = " + $elem.length);
                const stringToSplit = $elem.text();
                const separator = "";
                function splitString(stringToSplit, separator) {
                    return stringToSplit.split(separator);
                }
                function restoreSortRatings(arrayNumbers) {
                    let array = [];
                    let number = arrayNumbers[0];
                    let previousSymbol = arrayNumbers[0];
                    for (let index = 1; index < arrayNumbers.length; index++) {
                        if (previousSymbol == '.') {
                            number = number + arrayNumbers[index];
                            array.push(number);
                            number = "";
                        }
                        else if (arrayNumbers[index] != '.' && previousSymbol != '.' && number != "") {
                            array.push(previousSymbol);
                            number = arrayNumbers[index];
                        } else {
                            number = number + arrayNumbers[index];
                        }
                        previousSymbol = arrayNumbers[index];
                    }
                    //
                    // array.forEach(element => {
                    //     cy.log(element)
                    // });
                    return array.sort(function (a, b) { return b - a });
                }
                cy.log($elem.text());
                let raitings = restoreSortRatings(splitString(stringToSplit, separator));
                const top1El = `//div[@class="content__section movies__section"]//div[text()="${raitings[0]}"]/../../../..//span[contains(@class,"movie-block__info-icon-wishlist")]`;
                const top2El = `//div[@class="content__section movies__section"]//div[text()="${raitings[1]}"]/../../../..//span[contains(@class,"movie-block__info-icon-wishlist")]`;
                const top3El = `//div[@class="content__section movies__section"]//div[text()="${raitings[2]}"]/../../../..//span[contains(@class,"movie-block__info-icon-wishlist")]`;
                // cy.log(top1El);
                cy.xpath(top1El).click({force: true});
                // cy.get($elem)
                //     .contains(raitings[0])
                //     .parentsUntil('movie-block__flipper-inner')
                //     .children()
                //     .should('have.class','movie-block__info-icon-wishlist')
                //     // .invoke('show')
                //     // .children('span.movie-block__info-icon-wishlist.movie-block__info-icon_wishlist-pass')
                //     .click();
                cy.get('div.pp-block.popup-movies-wishlist-subscribed>div.modal-dialog.modal-md.vertical-center button.close.pp-block__close i').click();
                cy.xpath(top2El).click({force: true});
                cy.get('div.pp-block.popup-movies-wishlist-subscribed>div.modal-dialog.modal-md.vertical-center button.close.pp-block__close i').click();
                cy.xpath(top3El).click({force: true});
                cy.get('div.pp-block.popup-movies-wishlist-subscribed>div.modal-dialog.modal-md.vertical-center button.close.pp-block__close i').click();
            });
        // cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block div.movie-block__flip-back div.movie-block__imdb-rating')
        // .each(($elem, index) => {
        //     let raiting = $elem.text();
        //     array.push(raiting);
        //     array.sort(function (a, b) { return b - a });
        //     cy.log(index + " : " + array);
        //     // cy.log(raiting);
        //     // return array;
        //     // return array.sort(function (a, b) { return a - b });
        // });
        // .then(function(){
        //     // array.sort(function (a, b) { return a - b });
        //     cy.log(array.length);
        //     // return array.sort(function (a, b) { return a - b });
        // });
        // cy.log("raitings array = " + array.length);
        // cy.log("raitings = " + raitings.length);
        // cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block div.movie-block__flip-back div.movie-block__title-inner')
        //     // .invoke('show')
        //     .each(($elem, index) => {
        //         // cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block').invoke('show');
        //         // cy.wait(200);
        //         // const title = [];
        //         // cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block div.movie-block__flip-back div.movie-block__title-inner')
        //         //     .then(function ($elem) {
        //         //         // title.push($elem.text());
        //         //         cy.log($elem.text());
        //         //     });
        //         // cy.log("title = " + cy.get('div.movie-block__flip-back div.movie-block__title-inner').text());
        //         const title = $elem.text();
        //         cy.log(index + " " + title);
        //         titles.push(title);
        //         const rating = [];
        //         // cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block div.movie-block__flip-back div.movie-block__imdb-rating')
        //         //     .then(function ($elem) {
        //         //         rating.push($elem.text());
        //         //         // cy.log($elem.text());
        //         //     });
        //         // cy.log("title array = " + title.length);
        //         // cy.log("rating array = " + rating.length);
        //         // $div.get('div.movie-block__flip-back').invoke('show');
        //         // $div.get('div.movie-block__flip-back div.movie-block__imdb-rating').should('be.visible');
        //         // const cellsToPriceObjects = (cells$) => {
        //         //     return _.map(cells$, (cell$) => {
        //         //       return {
        //         //         price: Number(cell$.textContent),
        //         //         rowIndex: Number(cell$.parentElement.attributes['row-index'].value),
        //         //       }
        //         //     })
        //         //   }
        //     });
        //     cy.log(titles.length);
        // cy.get('div[class="content__section movies__section"] div.tile-list-wr>div.movie-block')
        //     .then($elements => {
        //         $elements.get('movie-block__flip-back').should('be.gt', 0);
        //         // let movies_arr = $elements.map($el => $el.get('movie-block__flip-back'));
        //         // cy.log('number of films = ' + movies_arr.its('length').should('be.gt', 0));
        // });
        // function compare(a, b) {
        //     let movie_rating_a = 0;
        //     let movie_rating_b = 0;
        //     if (a != null) {
        //         movie_rating_a = a;
        //     }
        //     if (b != null) {
        //         movie_rating_b = b;
        //     }
        //     if (movie_rating_a < movie_rating_b) {
        //         return -1;
        //     }
        //     if (movie_rating_a > movie_rating_b) {
        //         return 1;
        //     }
        //     return 0;
        // };
        // movies_array.should('have.length', 17);
        // let sorted_movies_array = movies_array.sort(compare);
        // console.log("film 1 name = " + sorted_movies_array[0].$('div.movie-block__flip-back div.movie-block__title-inner').text());
        // console.log("film 1 rating = " + sorted_movies_array[0].$('div.movie-block__flip-back div.movie-block__imdb-rating').text());
        //
        cy.visit('https://cabinet.planetakino.ua/profile/favorite-movies');
        cy.get('div.content div.masonry>div.masonry__item').its('length').should('eq', 3);
    })
});
