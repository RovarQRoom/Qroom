function getWeekNumber(date) {
    const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfTheYear) / 86400000;
    
    return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7)
  }
  
  function isLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }
  
  class Day {
    constructor(date = null, lang = 'default') {
      date = date ?? new Date();
      
      this.Date = date;
      this.date = date.getDate();
      this.day = date.toLocaleString(lang, { weekday: 'long'});
      this.dayNumber = date.getDay() + 1;
      this.dayShort = date.toLocaleString(lang, { weekday: 'short'});
      this.year = date.getFullYear();
      this.yearShort = date.toLocaleString(lang, { year: '2-digit'});
      this.month = date.toLocaleString(lang, { month: 'long'});
      this.monthShort = date.toLocaleString(lang, { month: 'short'});
      this.monthNumber = date.getMonth() + 1;
      this.timestamp = date.getTime();
      this.week = getWeekNumber(date);
    }
    
    get isToday() {
      return this.isEqualTo(new Date());
    }
    
    isEqualTo(date) {
      date = date instanceof Day ? date.Date : date;
      
      return date.getDate() === this.date &&
        date.getMonth() === this.monthNumber - 1 &&
        date.getFullYear() === this.year;
    }
    
    format(formatStr) {
      return formatStr
        .replace(/\bYYYY\b/, this.year)
        .replace(/\bYYY\b/, this.yearShort)
        .replace(/\bWW\b/, this.week.toString().padStart(2, '0'))
        .replace(/\bW\b/, this.week)
        .replace(/\bDDDD\b/, this.day)
        .replace(/\bDDD\b/, this.dayShort)
        .replace(/\bDD\b/, this.date.toString().padStart(2, '0'))
        .replace(/\bD\b/, this.date)
        .replace(/\bMMMM\b/, this.month)
        .replace(/\bMMM\b/, this.monthShort)
        .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, '0'))
        .replace(/\bM\b/, this.monthNumber)
    }
  }
  
  class Month {
    constructor(date = null, lang = 'default') {
      const day = new Day(date, lang);
      const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      this.lang = lang;
      
      this.name = day.month;
      this.number = day.monthNumber;
      this.year = day.year;
      this.numberOfDays = monthsSize[this.number - 1];
      
      if(this.number === 2) {
        this.numberOfDays += isLeapYear(day.year) ? 1 : 0;
      }
      
      this[Symbol.iterator] = function* () {
        let number = 1;
        yield this.getDay(number);
        while(number < this.numberOfDays) {
          ++number;
          yield this.getDay(number);
        }
      }
    }
    
    getDay(date) {
      return new Day(new Date(this.year, this.number - 1, date), this.lang);
    }
  }
  
  class Calendar {
    weekDays = Array.from({length: 7});
    
    constructor(year = null, monthNumber = null, lang = 'default') {
      this.today = new Day(null, lang);
      this.year = year ?? this.today.year;
      this.month = new Month(new Date(this.year, (monthNumber || this.today.monthNumber) - 1), lang);
      this.lang = lang;
      
      this[Symbol.iterator] = function* () {
        let number = 1;
        yield this.getMonth(number);
        while(number < 12) {
          ++number;
          yield this.getMonth(number);
        }
      }
      
      this.weekDays.forEach((_, i) => {
        const day = this.month.getDay(i + 1);
        if(!this.weekDays.includes(day.day)) {
          this.weekDays[day.dayNumber - 1] = day.day
        }
      })
    }
    
    get isLeapYear() {
      return isLeapYear(this.year);
    }
    
    getMonth(monthNumber) {
      return new Month(new Date(this.year, monthNumber - 1), this.lang);
    }
    
    getPreviousMonth() {
      if(this.month.number === 1) {
        return new Month(new Date(this.year - 1, 11), this.lang);
      }
      
      return new Month(new Date(this.year, this.month.number - 2), this.lang);
    }
    
    getNextMonth() {
      if(this.month.number === 12) {
        return new Month(new Date(this.year + 1, 0), this.lang);
      }
      
      return new Month(new Date(this.year, this.month.number + 2), this.lang);
    }
    
    goToDate(monthNumber, year) {
      this.month = new Month(new Date(year, monthNumber - 1), this.lang);
      this.year = year;
    }
    
    goToNextYear() {
      this.year += 1;
      this.month = new Month(new Date(this.year, 0), this.lang);
    }
    
    goToPreviousYear() {
      this.year -= 1;
      this.month = new Month(new Date(this.year, 11), this.lang);
    }
    
    goToNextMonth() {
      if(this.month.number === 12) {
        return this.goToNextYear();
      }
      
      this.month = new Month(new Date(this.year, (this.month.number + 1) - 1), this.lang);
    }
    
    goToPreviousMonth() {
      if(this.month.number === 1) {
        return this.goToPreviousYear();
      }
      
      this.month = new Month(new Date(this.year, (this.month.number - 1) - 1), this.lang);
    }
  }
  
  class DatePicker extends HTMLElement {
    format = 'MMM DD, YYYY';
    position = 'bottom';
    visible = false;
    date = null;
    mounted = false;
    // elements
    toggleButton = null;
    calendarDropDown = null;
    calendarDateElement = null;
    calendarDaysContainer = null;
    selectedDayElement = null;
    
    constructor() {
      super();
      
      const lang = window.navigator.language;
      const date = new Date(this.date ?? (this.getAttribute("date") || Date.now()));
      
      this.shadow = this.attachShadow({mode: "open"});
      this.date = new Day(date, lang);
      this.calendar = new Calendar(this.date.year, this.date.monthNumber, lang);
      
      this.format = this.getAttribute('format') || this.format;
      this.position = DatePicker.position.includes(this.getAttribute('position'))
        ? this.getAttribute('position')
        : this.position;
      this.visible = this.getAttribute('visible') === '' 
        || this.getAttribute('visible') === 'true'
        || this.visible;
      
      this.render();
    }
    
    connectedCallback() {
      this.mounted = true;
      
      this.toggleButton = this.shadow.querySelector('.date-toggle');
      this.calendarDropDown = this.shadow.querySelector('.calendar-dropdown');
      const [prevBtn, calendarDateElement, nextButton] = this.calendarDropDown
        .querySelector('.header').children;
      this.calendarDateElement = calendarDateElement;
      this.calendarDaysContainer = this.calendarDropDown.querySelector('.month-days');
      
      this.toggleButton.addEventListener('click', () => this.toggleCalendar());
      prevBtn.addEventListener('click', () => this.prevMonth());
      nextButton.addEventListener('click', () => this.nextMonth());
      document.addEventListener('click', (e) => this.handleClickOut(e));
      
      this.renderCalendarDays();
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
      if(!this.mounted) return;
      
      switch(name) {
        case "date":
          this.date = new Day(new Date(newValue));
          this.calendar.goToDate(this.date.monthNumber, this.date.year);
          this.renderCalendarDays();
          this.updateToggleText();
          break;
        case "format":
          this.format = newValue;
          this.updateToggleText();
          break;
        case "visible":
          this.visible = ['', 'true', 'false'].includes(newValue) 
            ? newValue === '' || newValue === 'true'
            : this.visible;
          this.toggleCalendar(this.visible);
          break;
        case "position":
          this.position = DatePicker.position.includes(newValue)
            ? newValue
            : this.position;
          this.calendarDropDown.className = 
            `calendar-dropdown ${this.visible ? 'visible' : ''} ${this.position}`;
          break;
      }
    }
    
    toggleCalendar(visible = null) {
      if(visible === null) {
        this.calendarDropDown.classList.toggle('visible');
      } else if(visible) {
        this.calendarDropDown.classList.add('visible');
      } else {
        this.calendarDropDown.classList.remove('visible');
      }
      
      this.visible = this.calendarDropDown.className.includes('visible');
      
      if(this.visible) {
        this.calendarDateElement.focus();
      } else {
        this.toggleButton.focus();
        
        if(!this.isCurrentCalendarMonth()) {
          this.calendar.goToDate(this.date.monthNumber, this.date.year);
          this.renderCalendarDays();
        }
      }
    }
    
    prevMonth() {
      this.calendar.goToPreviousMonth();
      this.renderCalendarDays();
    }
    
    nextMonth() {
      this.calendar.goToNextMonth();
      this.renderCalendarDays();
    }
    
    updateHeaderText() {
      this.calendarDateElement.textContent = 
        `${this.calendar.month.name}, ${this.calendar.year}`;
      const monthYear = `${this.calendar.month.name}, ${this.calendar.year}`
      this.calendarDateElement
        .setAttribute('aria-label', `current month ${monthYear}`);
    }
    
    isSelectedDate(date) {
      return date.date === this.date.date &&
        date.monthNumber === this.date.monthNumber &&
        date.year === this.date.year;
    }
    
    isCurrentCalendarMonth() {
      return this.calendar.month.number === this.date.monthNumber &&
        this.calendar.year === this.date.year;
    }
    
    selectDay(el, day) {
      if(day.isEqualTo(this.date)) return;
      
      this.date = day;
      
      if(day.monthNumber !== this.calendar.month.number) {
        this.prevMonth();
      } else {
        el.classList.add('selected');
        this.selectedDayElement.classList.remove('selected');
        this.selectedDayElement = el;
      }
      
      this.toggleCalendar();
      this.updateToggleText();
    }
    
    handleClickOut(e) {
      if(this.visible && (this !== e.target)) {
        this.toggleCalendar(false);
      }
    }
    
    getWeekDaysElementStrings() {
      return this.calendar.weekDays
        .map(weekDay => `<span>${weekDay.substring(0, 3)}</span>`)
        .join('');
    }
    
    getMonthDaysGrid() {
      const firstDayOfTheMonth = this.calendar.month.getDay(1);
      const prevMonth = this.calendar.getPreviousMonth();
      const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1;
      const totalDays = this.calendar.month.numberOfDays + totalLastMonthFinalDays;
      const monthList = Array.from({length: totalDays});
      
      for(let i = totalLastMonthFinalDays; i < totalDays; i++) {
        monthList[i] = this.calendar.month.getDay(i + 1 - totalLastMonthFinalDays)
      }
      
      for(let i = 0; i < totalLastMonthFinalDays; i++) {
        const inverted = totalLastMonthFinalDays - (i + 1);
        monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted);
      }
      
      return monthList;
    }
    
    updateToggleText() {
      const date = this.date.format(this.format)
      this.toggleButton.textContent = date;
    }
    
    updateMonthDays() {
      this.calendarDaysContainer.innerHTML = '';
      
      this.getMonthDaysGrid().forEach(day => {
        const el = document.createElement('button');
        el.className = 'month-day';
        el.textContent = day.date;
        el.addEventListener('click', (e) => this.selectDay(el, day));
        el.setAttribute('aria-label', day.format(this.format));
          
        if(day.monthNumber === this.calendar.month.number) {
          el.classList.add('current');
        }
  
        if(this.isSelectedDate(day)) {
          el.classList.add('selected');
          this.selectedDayElement = el;
        }
        
        this.calendarDaysContainer.appendChild(el);
      })
    }
    
    renderCalendarDays() {
      this.updateHeaderText();
      this.updateMonthDays();
      this.calendarDateElement.focus();
    }
    
    static get observedAttributes() { 
      return ['date', 'format', 'visible', 'position']; 
    }
      
    static get position() {
      return ['top', 'left', 'bottom', 'right'];
    }
    
    get style() {
      return `
        :host {
          position: relative;
          font-family: sans-serif;
        }
        
        .date-toggle {
          padding: 8px 15px;
          border: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background: #eee;
          color: #333;
          border-radius: 6px;
          font-weight: bold;
          cursor: pointer;
          text-transform: capitalize;
        }
        
        .calendar-dropdown {
          display: none;
          width: 300px;
          height: 300px;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, 8px);
          padding: 20px;
          background: #fff;
          border-radius: 5px;
          box-shadow: 0 0 8px rgba(0,0,0,0.2);
        }
        
        .calendar-dropdown.top {
          top: auto;
          bottom: 100%;
          transform: translate(-50%, -8px);
        }
        
        .calendar-dropdown.left {
          top: 50%;
          left: 0;
          transform: translate(calc(-8px + -100%), -50%);
        }
        
        .calendar-dropdown.right {
          top: 50%;
          left: 100%;
          transform: translate(8px, -50%);
        }
        
        .calendar-dropdown.visible {
          display: block;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 10px 0 30px;
        }
        
        .header h4 {
          margin: 0;
          text-transform: capitalize;
          font-size: 21px;
          font-weight: bold;
        }
        
        .header button {
          padding: 0;
          border: 8px solid transparent;
          width: 0;
          height: 0;
          border-radius: 2px;
          border-top-color: #222;
          transform: rotate(90deg);
          cursor: pointer;
          background: none;
          position: relative;
        }
        
        .header button::after {
          content: '';
          display: block;
          width: 25px;
          height: 25px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        
        .header button:last-of-type {
          transform: rotate(-90deg);
        }
        
        .week-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-gap: 5px;
          margin-bottom: 10px;
        }
        
        .week-days span {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 10px;
          text-transform: capitalize;
        }
        
        .month-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-gap: 5px;
        }
        
        .month-day {
          padding: 8px 5px;
          background: #c7c9d3;
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 2px;
          cursor: pointer;
          border: none;
        }
        
        .month-day.current {
          background: #444857;
        }
        
        .month-day.selected {
          background: #28a5a7;
          color: #ffffff;
        }
        
        .month-day:hover {
          background: #34bd61;
        }
      `;
    }
    
    render() {
      const monthYear = `${this.calendar.month.name}, ${this.calendar.year}`;
      const date = this.date.format(this.format)
      this.shadow.innerHTML = `
        <style>${this.style}</style>
        <button type="button" class="date-toggle">${date}</button>
        <div class="calendar-dropdown ${this.visible ? 'visible' : ''} ${this.position}">
          <div class="header">
              <button type="button" class="prev-month" aria-label="previous month"></button>
              <h4 tabindex="0" aria-label="current month ${monthYear}">
                ${monthYear}
              </h4>
              <button type="button" class="prev-month" aria-label="next month"></button>
          </div>
          <div class="week-days">${this.getWeekDaysElementStrings()}</div>
          <div class="month-days"></div>
        </div>
      `
    }
  }
  
  customElements.define("date-picker", DatePicker);