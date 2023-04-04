// Scrol Animation
window.addEventListener("load", function() {
    AOS.init();
})


window.onload = function() {
    $(document).ready(function() {
        $(window).scroll(function() {
            if (this.scrollY > 20) {
                $('.navbar').addClass("sticky");
            } else {
                $('.navbar').removeClass("sticky");
            }

            if (this.scrollY > 500) {
                $('.scroll-up-btn').addClass("show");
            } else {
                $('.scroll-up-btn').removeClass("show");
            }
        });

        $('.scroll-up-btn').click(function() {
            $('ejs').animate({ scrollTop: 0 });
            $('ejs').css("scrollBehavior", "auto");
        });

        $('.navbar .menu li a').click(function() {
            $('ejs').css("scrollBehavior", "smooth");
        });

        $('.menu-btn').click(function() {
            $('.navbar .menu').toggleClass("active");
            $('.menu-btn i').toggleClass("active");
        });

        var typed = new Typed(".typing", {
            strings: ["SULAIMANI", "ERBIL", "DUHOK"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });

        $('.carousel').owlCarousel({
            margin: 20,
            loop: true,
            autoplay: true,
            autoplayTimeOut: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 2,
                    nav: false
                },
                1000: {
                    items: 3,
                    nav: false
                }
            }
        });
    });

    // Search & Login & Rigister
    let searchForm = document.querySelector('.search-form');
    document.querySelector('#theme-toggler').onclick = () => {
        searchForm.classList.toggle('active');
    }

    window.onscroll = () => {
        searchForm.classList.remove('active');
    }



    $('.team-slider').owlCarousel({
        loop: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 5000,
        smartSpeed: 450,
        margin: 20,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            991: {
                items: 3
            },
            1200: {
                items: 3
            },
            1920: {
                items: 3
            }
        }
    });

    //  Search The City For Hotel
    const button = document.querySelector('#button');
    const select = document.querySelector("#dropdown");
    const options = document.querySelectorAll(".option");
    const selectLabel = document.querySelector('#select-label');

    button.addEventListener("click", function(e) {
        e.preventDefault();
        toggleHidden();
    });

    function toggleHidden() {
        select.classList.toggle("hidden");
    }

    options.forEach(function(option) {
        option.addEventListener("click", function(e) {
            setSelectTitle(e);
        });
    });

    function setSelectTitle(e) {
        const labelElement = document.querySelector(`label[for="${e.target.id}"]`).innerText;
        selectLabel.innerText = labelElement;
        toggleHidden();
    };


    // Check-In-Date
    const date_picker_element1 = document.querySelector('.date-picker1');
    const selected_date_element1 = document.querySelector('.date-picker1 .selected-date1');
    const dates_element1 = document.querySelector('.date-picker1 .dates1');
    const mth_element1 = document.querySelector('.date-picker1 .dates1 .month1 .mth1');
    const next_mth_element1 = document.querySelector('.date-picker1 .dates1 .month1 .next-mth1');
    const prev_mth_element1 = document.querySelector('.date-picker1 .dates1 .month1 .prev-mth1');
    const days_element1 = document.querySelector('.date-picker1 .dates1 .days1');

    const months1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date1 = new Date();
    let day1 = date1.getDate();
    let month1 = date1.getMonth();
    let year1 = date1.getFullYear();

    let selectedDate1 = date1;
    let selectedDay1 = day1;
    let selectedMonth1 = month1;
    let selectedYear1 = year1;

    mth_element1.textContent = months1[month1] + ' ' + year1;

    selected_date_element1.textContent = formatDate(date1);
    selected_date_element1.dataset.value = selectedDate1;

    populateDates1();

    date_picker_element1.addEventListener('click', tggleDatePicker);
    next_mth_element1.addEventListener('click', gToNextMonth);
    prev_mth_element1.addEventListener('click', gToPrevMonth);

    function tggleDatePicker(e1) {
        if (!checkEventPathForClass(e1.path, 'dates1')) {
            dates_element1.classList.toggle('active');
        }
    }

    function gToNextMonth(e1) {
        month1++;
        if (month1 > 11) {
            month1 = 0;
            year1++;
        }
        mth_element1.textContent = months1[month1] + ' ' + year1;
        populateDates1();
    }

    function gToPrevMonth(e1) {
        month1--;
        if (month1 < 0) {
            month1 = 11;
            selectedYear1--;
        }
        mth_element1.textContent = months1[month1] + ' ' + year1;
        populateDates1();
    }

    function populateDates1(e1) {
        days_element1.innerHTML = '';
        let amount_days1 = 31;

        if (month1 == 1) {
            amount_days1 = 28;
        }

        for (let i = 0; i < amount_days1; i++) {
            const day_element1 = document.createElement('div');
            day_element1.classList.add('day1');
            day_element1.textContent = i + 1;

            if (selectedDay1 == (i + 1) && selectedYear1 == year1 && selectedMonth1 == month1) {
                day_element1.classList.add('selected1');
            }

            day_element1.addEventListener('click', function() {
                selectedDate1 = new Date(year1 + '-' + (month1 + 1) + '-' + (i + 1));
                selectedDay1 = (i + 1);
                selectedMonth1 = month1;
                selectedYear1 = year1;

                selected_date_element1.textContent = formatDate1(selectedDate1);
                selected_date_element1.dataset.value = selectedDate1;

                populateDates1();
            });

            days_element1.appendChild(day_element1);
        }
    }

    function chckEventPathForClass(path, selector) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains(selector)) {
                return true;
            }
        }

        return false;
    }

    function formatDate1(d1) {
        let day2 = d1.getDate();
        if (day2 < 10) {
            day2 = '0' + day2;
        }

        let month2 = d1.getMonth() + 1;
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        let year2 = d1.getFullYear();

        return ' DD ' + day2 + ' / ' + month2 + ' MM ' + ' / ' + year2 + ' YYYY ';
    }

    //   Check-Out-Date
    const date_picker_element = document.querySelector('.date-picker');
    const selected_date_element = document.querySelector('.date-picker .selected-date');
    const dates_element = document.querySelector('.date-picker .dates');
    const mth_element = document.querySelector('.date-picker .dates .month .mth');
    const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
    const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
    const days_element = document.querySelector('.date-picker .dates .days');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    let selectedDate = date;
    let selectedDay = day;
    let selectedMonth = month;
    let selectedYear = year;

    mth_element.textContent = months[month] + ' ' + year;

    selected_date_element.textContent = formatDate(date);
    selected_date_element.dataset.value = selectedDate;

    populateDates();

    date_picker_element.addEventListener('click', toggleDatePicker);
    next_mth_element.addEventListener('click', goToNextMonth);
    prev_mth_element.addEventListener('click', goToPrevMonth);

    function toggleDatePicker(e) {
        if (!checkEventPathForClass(e.path, 'dates')) {
            dates_element.classList.toggle('active');
        }
    }

    function goToNextMonth(e) {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }

    function goToPrevMonth(e) {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        mth_element.textContent = months[month] + ' ' + year;
        populateDates();
    }

    function populateDates(e) {
        days_element.innerHTML = '';
        let amount_days = 31;

        if (month == 1) {
            amount_days = 28;
        }

        for (let i = 0; i < amount_days; i++) {
            const day_element = document.createElement('div');
            day_element.classList.add('day');
            day_element.textContent = i + 1;

            if (selectedDay == (i + 1) && selectedYear == year && selectedMonth == month) {
                day_element.classList.add('selected');
            }

            day_element.addEventListener('click', function() {
                selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
                selectedDay = (i + 1);
                selectedMonth = month;
                selectedYear = year;

                selected_date_element.textContent = formatDate(selectedDate);
                selected_date_element.dataset.value = selectedDate;

                populateDates();
            });

            days_element.appendChild(day_element);
        }
    }

    function checkEventPathForClass(path, selector) {
        for (let i = 0; i < path.length; i++) {
            if (path[i].classList && path[i].classList.contains(selector)) {
                return true;
            }
        }

        return false;
    }

    function formatDate(d) {
        let day = d.getDate();
        if (day < 10) {
            day = '0' + day;
        }

        let month = d.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }

        let year = d.getFullYear();

        return ' DD ' + day + ' / ' + month + ' MM ' + ' / ' + year + ' YYYY ';
    }
}