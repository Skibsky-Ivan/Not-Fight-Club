(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={GLOBAL:`game_global_state`,BATTLE:`game_battle_state`};function t(e,t){try{let n=localStorage.getItem(e);return n?JSON.parse(n):t}catch(n){return console.warn(`Ошибка чтения ${e} из localStorage, применены дефолтные настройки:`,n),t}}function n(e,t){try{localStorage.setItem(e,JSON.stringify(t))}catch(t){console.error(`Ошибка записи ${e} в localStorage:`,t)}}function r(e){try{localStorage.removeItem(e)}catch(t){console.error(`Ошибка удаления ${e} из localStorage:`,t)}}var i=[{id:`brandon-the-flayed`,name:`Брэндон Содранный`,description:`Могучий рыцарь ордена, облаченный в кольчугу и закаленную сталь. Наводит ужас на врагов.`,avatar:`./img/knights/Brandon-the-Flayed.png`,attackZonesCount:2,defenseZonesCount:2,baseDamage:30,critChance:15,critMultiplier:1.5,hp:100},{id:`baron-godfrey`,name:`Барон Годфри Эллсворт`,description:`Опытный тактик и феодал. Предпочитает глухую оборону и выверенные точечные выпады.`,avatar:`./img/knights/Baron-Godfrey-Ellsworth.png`,attackZonesCount:1,defenseZonesCount:3,baseDamage:25,critChance:10,critMultiplier:1.5,hp:110},{id:`cormac-the-tracker`,name:`Кормак Следопыт`,description:`Закаленный в походах следопыт со щитом. Обладает высоким запасом здоровья и стойкостью.`,avatar:`./img/knights/Cormac-the-Tracker.png`,attackZonesCount:1,defenseZonesCount:3,baseDamage:22,critChance:20,critMultiplier:1.6,hp:120},{id:`sir-osmund`,name:`Сэр Осмунд Ржавый`,description:`Ветеран множества турниров. Его латы потемнели от времени, но тяжелый удар всё так же опасен.`,avatar:`./img/knights/Sir-Osmund-the-Rusty-Mac.png`,attackZonesCount:2,defenseZonesCount:1,baseDamage:35,critChance:10,critMultiplier:1.5,hp:115},{id:`sir-roderick`,name:`Сэр Родерик`,description:`Благородный чемпион в закрытом шлеме. Мастер сокрушительных критических ударов.`,avatar:`./img/knights/Sir-Roderick-Ironjaw.png`,attackZonesCount:1,defenseZonesCount:2,baseDamage:26,critChance:30,critMultiplier:1.8,hp:95},{id:`sir-walter`,name:`Сэр Уолтер Серый`,description:`Скромный рыцарь в кольчужном капюшоне. Универсальный боец с хорошим балансом характеристик.`,avatar:`./img/knights/Sir-Walter-the-Grey.png`,attackZonesCount:1,defenseZonesCount:2,baseDamage:28,critChance:15,critMultiplier:1.5,hp:100}],a=`brandon-the-flayed`;function o(e){return i.find(t=>t.id===e)||i[0]}var s=[{id:`Raise-Your-Mugs-High`,name:`Поднимайте кружки выше!`,path:`./sounds/background-tracks/Raise-Your-Mugs-High.mp3`},{id:`Lively-Bard-Jig`,name:`Веселая джига барда`,path:`./sounds/background-tracks/Lively-Bard-Jig.mp3`},{id:`The-Jolly-Tankard`,name:`Веселая кружка`,path:`./sounds/background-tracks/The-Jolly-Tankard.mp3`},{id:`Medieval-Dance-Party`,name:`Средневековый танцевальный пир`,path:`./sounds/background-tracks/Medieval-Dance-Party.mp3`},{id:`Pirate-Tavern-Riot`,name:`Бунт в пиратской таверне`,path:`./sounds/background-tracks/Pirate-Tavern-Riot.mp3`},{id:`Tavern-Dance-Loop`,name:`Танец в таверне`,path:`./sounds/background-tracks/Tavern-Dance-Loop.mp3`}],c=`Tavern-Dance-Loop`;function l(e){return s.find(t=>t.id===e)?.path||s[0].path}var u=[{id:`citadel`,name:`Цитадель`,path:`./img/backgrounds/citadel.png`},{id:`fortress`,name:`Крепость`,path:`./img/backgrounds/fortress.png`},{id:`forest`,name:`Тёмный лес`,path:`./img/backgrounds/forest.png`}],d={playerName:``,selectedAvatarId:a,selectedThemeId:`citadel`,sound:{bgMusicTrack:c,musicVolume:50,isMuted:!1},stats:{totalBattles:0,wins:0,losses:0,draws:0,history:[]}},f=new class{state;listeners=new Set;constructor(){this.state=t(e.GLOBAL,d)}getState(){return this.state}setState(t){this.state={...this.state,...t},n(e.GLOBAL,this.state),this.notify()}recordBattleResult(e,t){let{stats:n}=this.state,r={id:Date.now().toString(),opponentName:e,result:t,date:new Date().toLocaleString(`ru-RU`,{day:`2-digit`,month:`2-digit`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})};this.setState({stats:{totalBattles:n.totalBattles+1,wins:t===`win`?n.wins+1:n.wins,losses:t===`loss`?n.losses+1:n.losses,draws:t===`draw`?n.draws+1:n.draws,history:[r,...n.history]}})}subscribe(e){return this.listeners.add(e),e(this.getState()),()=>{this.listeners.delete(e)}}notify(){let e=this.getState();for(let t of Array.from(this.listeners))try{t(e)}catch(e){console.error(`Ошибка в подписчике Store:`,e)}}};function p(){function e(e){document.documentElement.dataset.theme=e}return e(f.getState().selectedThemeId),f.subscribe(t=>{e(t.selectedThemeId)})}function m(){let e=new Audio;e.loop=!0;let t=!1,n=``;function r(r){let i=l(r.bgMusicTrack);n!==r.bgMusicTrack&&(n=r.bgMusicTrack,e.src=i,e.load()),e.volume=r.musicVolume/100,e.muted=r.isMuted,t&&(r.isMuted?e.pause():e.play().catch(()=>{}))}function i(){t||(t=!0,f.getState().sound.isMuted||e.play().catch(()=>{}))}r(f.getState().sound);let a=f.subscribe(e=>{r(e.sound)}),o=[`click`,`keydown`,`touchstart`].map(e=>{let t=()=>i();return document.addEventListener(e,t,{once:!0}),{type:e,handler:t}});return()=>{a(),e.pause(),e.src=``,o.forEach(({type:e,handler:t})=>{document.removeEventListener(e,t)})}}p(),m();var h=new class{routes=[];rootElement;listeners=[];currPage=null;constructor(e){let t=document.getElementById(e);if(!t)throw Error(`Контейнер с id "${e}" не найден в DOM!`);this.rootElement=t,window.addEventListener(`hashchange`,()=>this.handleRoute()),window.addEventListener(`load`,()=>this.handleRoute()),document.addEventListener(`click`,e=>{let t=e.target.closest(`a[data-link]`);if(t){let n=t.getAttribute(`href`);if(!n)return;e.preventDefault();let r=n.replace(/^#/,``);this.navigate(r)}})}addRoute(e,t){let n=[],r=e.replace(/:(\w+)/g,(e,t)=>(n.push(t),`([^/]+)`)),i=RegExp(`^${r}$`);this.routes.push({path:e,regex:i,paramNames:n,pageClass:t})}getHashPath(){let e=window.location.hash.slice(1);return e?e.startsWith(`/`)?e:`/`+e:`/`}matchRoute(e){for(let t of this.routes){let n=e.match(t.regex);if(n){let e={};return t.paramNames?.forEach((t,r)=>{e[t]=n[r+1]}),{route:t,params:e}}}return null}resolvePageClass(e){let t=this.matchRoute(e);if(t)return{PageClass:t.route.pageClass,params:t.params};let n=this.routes.find(e=>e.path===`/404`);if(n)return{PageClass:n.pageClass,params:{}};throw Error(`Не найден pageClass для маршрута "${e}" и не зарегистрирован /404`)}renderPage(e,t){this.currPage&&=(this.currPage.unmount(),null),this.currPage=new e(t),this.currPage.mount(this.rootElement)}handleRoute(){let e=this.getHashPath(),{PageClass:t,params:n}=this.resolvePageClass(e);this.renderPage(t,n),this.listeners.forEach(t=>t(e,n))}subscribe(e){this.listeners.push(e);let t=this.getHashPath(),n=this.matchRoute(t);return e(t,n?n.params:{}),()=>{this.listeners=this.listeners.filter(t=>t!==e)}}navigate(e){let t=e.startsWith(`/`)?e:`/`+e;this.getHashPath()!==t&&(window.location.hash=t)}}(`app`),g=class{props;state;element;placeholder=null;constructor(e={}){let{tagName:t=`div`,className:n=``,dataset:r={},attributes:i={},props:a={}}=e;this.props=a,this.state={},this.element=document.createElement(t),n&&(this.element.className=n),r&&Object.assign(this.element.dataset,r);for(let[e,t]of Object.entries(i))this.element.setAttribute(e,t)}setState(e){let t={...this.state};this.state={...t,...e},this.onStateChanges(t,this.state),this.update()}onStateChanges(e,t){}onMount(){}onUnmount(){}render(){return``}update(){this.element.innerHTML=this.render(),this.afterRender()}afterRender(){}mount(e){this.placeholder=e,this.update(),e.replaceWith(this.element),this.onMount()}unmount(){this.onUnmount(),this.element.isConnected&&(this.placeholder?this.element.replaceWith(this.placeholder):this.element.remove()),this.placeholder=null}};function _(e){let t=e.trim();return t.length<2||t.length>15||!/^[a-zA-Zа-яА-ЯёЁ0-9_-\s]+$/.test(t)?{valid:!1,message:`От 2 до 15 символов. Допустимы буквы (русские и латинские), цифры, тире, подчёркивание и пробелы.`}:{valid:!0,message:``}}var v=class{errorEl;inputEl;timeoutId=null;constructor(e,t){this.errorEl=e,this.inputEl=t}show(e,t=3e3){this.clear(),this.errorEl.textContent=e,this.errorEl.hidden=!1,this.inputEl.setAttribute(`aria-invalid`,`true`),this.timeoutId=setTimeout(()=>{this.hide()},t)}hide(){this.errorEl.hidden=!0,this.inputEl.setAttribute(`aria-invalid`,`false`)}clear(){this.timeoutId&&=(clearTimeout(this.timeoutId),null)}},y=class extends g{errorHandler=null;form=null;input=null;constructor(){super({tagName:`main`,className:`page registration-page`})}onMount(){if(f.getState().playerName){h.navigate(`/home`);return}this.form=this.element.querySelector(`#registrationForm`),this.input=this.element.querySelector(`#playerNameInput`);let e=this.element.querySelector(`#nameError`);!this.form||!this.input||!e||(this.errorHandler=new v(e,this.input),this.form.addEventListener(`submit`,this.handleSubmit),this.input.addEventListener(`input`,this.handleInput))}onUnmount(){this.form?.removeEventListener(`submit`,this.handleSubmit),this.input?.removeEventListener(`input`,this.handleInput),this.errorHandler?.clear(),this.errorHandler=null}handleSubmit=e=>{if(e.preventDefault(),this.errorHandler?.clear(),!this.input)return;let t=this.input.value.trim(),n=_(t);if(!n.valid){this.errorHandler?.show(n.message);return}f.setState({playerName:t}),h.navigate(`/home`)};handleInput=()=>{this.errorHandler?.hide(),this.errorHandler?.clear()};render(){return`
      <section class="parchment parchment--long parchment--registration">
        <img
          class="parchment__bg"
          src="./img/parchment/Parchment-curved-long.png"
          alt=""
          aria-hidden="true" />

        <div class="parchment__seal" aria-hidden="true"></div>

        <div class="parchment__content">
          <h1 class="registration-title">Средневековые войны</h1>

          <form class="registration-form" id="registrationForm" novalidate>
            <div class="input-group">
              <label for="playerNameInput" class="visually-hidden">
                Имя бойца
              </label>
              <input
                type="text"
                class="input-field input-field--parchment"
                id="playerNameInput"
                name="playerName"
                placeholder="Введи имя своего бойца..."
                minlength="2"
                maxlength="15"
                required
                autocomplete="off"
                data-input="player-name"
                aria-describedby="nameError"
                aria-invalid="false" />
              <p class="error-message" id="nameError" aria-live="polite" hidden>
                От 2 до 15 символов. Допустимы буквы (русские и латинские), цифры, тире, пробел и подчёркивание.
              </p>
            </div>

            <button type="submit" class="btn btn--registration">ВПЕРЁД</button>
          </form>
        </div>
      </section>
    `}},b=class extends g{constructor(){super({tagName:`main`,className:`page home-page`})}onMount(){this.element.addEventListener(`click`,this.handleClick)}onUnmount(){this.element.removeEventListener(`click`,this.handleClick)}handleClick=t=>{t.target.closest(`[data-action="start-battle"]`)&&(t.preventDefault(),r(e.BATTLE),h.navigate(`/battle`))};render(){return`
      <section class="parchment parchment--long parchment--menu">
        <img
          class="parchment__bg"
          src="./img/parchment/Parchment-curved-long.png"
          alt=""
          aria-hidden="true" />

        <div class="parchment__seal" aria-hidden="true"></div>

        <div class="parchment__content">
          <h1 class="home-title">Средневековые войны</h1>

          <nav class="home-nav" aria-label="Главное меню">
            <ul class="home-nav__list">
              <li class="home-nav__item">
                <a
                  href="#/battle"
                  class="btn btn--main-menu"
                  data-action="start-battle">
                  в бой
                </a>
              </li>
              <li class="home-nav__item">
                <a href="#/character" class="btn btn--main-menu" data-link>
                  Персонаж
                </a>
              </li>
              <li class="home-nav__item">
                <a href="#/settings" class="btn btn--main-menu" data-link>
                  Настройки
                </a>
              </li>
              <li class="home-nav__item">
                <a href="#/rules" class="btn btn--main-menu" data-link>
                  Правила
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    `}},x=class extends g{unsubscribe=null;constructor(){super({tagName:`header`,className:`top-bar`})}onMount(){this.unsubscribe=h.subscribe(e=>{this.updateActiveClass(e)})}onUnmount(){this.unsubscribe?.()}updateActiveClass(e){this.element.querySelectorAll(`.nav-link`).forEach(t=>{let n=(t.getAttribute(`href`)||``).replace(/^#/,``)||`/`,r=e===n||n!==`/`&&e.startsWith(`${n}/`);t.classList.toggle(`active`,r)})}render(){return`
      <nav class="nav">
        <a class="nav-link" href="#/home" data-link>Главная</a>
        <a class="nav-link" href="#/character" data-link>Персонаж</a>
        <a class="nav-link" href="#/settings" data-link>Настройки</a>
        <a class="nav-link" href="#/rules" data-link>Свод правил</a>
      </nav>
    `}},S=class extends g{selectedId;handleClick=e=>{let t=e.target.closest(`.char-card`);if(!t)return;let n=t.dataset.fighter;if(!n)return;let r=this.props.characters.find(e=>e.id===n);r&&this.props.onSelect?.(r)};constructor(e){super({tagName:`section`,className:`parchment parchment--long parchment--list`,props:e}),this.selectedId=e.selectedId}onMount(){this.element.addEventListener(`click`,this.handleClick)}onUnmount(){this.element.removeEventListener(`click`,this.handleClick)}setSelected(e){this.selectedId=e,this.forEachCard(t=>{let n=t.dataset.fighter===e;t.classList.toggle(`char-card--selected`,n),t.setAttribute(`aria-pressed`,String(n))})}setActive(e){this.forEachCard(t=>{t.classList.toggle(`char-card--active`,t.dataset.fighter===e)})}forEachCard(e){this.element.querySelectorAll(`.char-card`).forEach(e)}renderCard(e){let t=e.id===this.selectedId;return`
      <button
        type="button"
        class="char-card${t?` char-card--selected`:``}"
        data-fighter="${e.id}"
        aria-pressed="${t}"
        aria-label="Просмотреть ${e.name}">
        <div class="char-card__avatar">
          <img src="${e.avatar}" alt="${e.name}" loading="lazy" />
        </div>
      </button>
    `}render(){let{characters:e}=this.props;return`
      <img
        class="parchment__bg"
        src="./img/parchment/Parchment-curved-long.png"
        alt=""
        aria-hidden="true" />

      <div class="parchment__content">
        <h2 class="character-grid__title">
          БОЙЦЫ (<span>${e.length}</span>)
        </h2>

        <div class="character-grid-wrapper">
          <div class="character-grid">
            ${e.map(e=>this.renderCard(e)).join(``)}
          </div>
        </div>
      </div>
    `}},C=class extends g{character;handleSelect=e=>{e.target.closest(`[data-action="select-avatar"]`)&&this.props.onSelect&&this.props.onSelect(this.character)};constructor(e){super({tagName:`section`,className:`parchment parchment--info`,props:e}),this.character=e.character}onMount(){this.element.addEventListener(`click`,this.handleSelect)}onUnmount(){this.element.removeEventListener(`click`,this.handleSelect)}setCharacter(e){this.character=e,this.update()}render(){let{fighter:e,isSelectable:t=!0,isSelected:n=!1,unselectableMessage:r}=this.character,i=t?n?`<div class="char-details__current">Текущий</div>`:`<button type="button" class="btn btn--choose-character" data-action="select-avatar">выбрать</button>`:`<div class="char-details__unselectable">${r??`Разбойники не подчиняются приказам!`}</div>`;return`
      <img class="parchment__bg" src="./img/parchment/Parchment-straight.png" alt="" />

      <div class="parchment__content">
        <div class="char-details">
          <div class="char-details__sprite">
            <img src="${e.avatar}" alt="${e.name}" loading="lazy" data-char-preview />
          </div>

          <h2 class="char-details__title" data-char-name>${e.name}</h2>
          <p class="char-details__description" data-char-description>${e.description}</p>

          <dl class="char-details__stats">
            <div class="char-details__stat">
              <dt>Зоны атаки:</dt>
              <dd data-stat-attack-zones>${e.attackZonesCount}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Зоны защиты:</dt>
              <dd data-stat-defense-zones>${e.defenseZonesCount}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Урон:</dt>
              <dd data-stat-damage>${e.baseDamage}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Шанс крит удара:</dt>
              <dd data-stat-crit_chance>${e.critChance}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Множитель крита:</dt>
              <dd data-stat-crit_multiplier>${e.critMultiplier}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Здоровье:</dt>
              <dd data-stat-hp>${e.hp}</dd>
            </div>
          </dl>

          ${i}
        </div>
      </div>
    `}},w=class extends g{nameEl=null;totalEl=null;winsEl=null;lossesEl=null;drawsEl=null;historyList=null;constructor(e){super({tagName:`section`,className:`parchment parchment--long parchment--stats`,props:e})}afterRender(){this.nameEl=this.element.querySelector(`[data-stats-name]`),this.totalEl=this.element.querySelector(`[data-stats-total]`),this.winsEl=this.element.querySelector(`[data-stats-wins]`),this.lossesEl=this.element.querySelector(`[data-stats-losses]`),this.drawsEl=this.element.querySelector(`[data-stats-draws]`),this.historyList=this.element.querySelector(`[data-battle-history]`)}onMount(){this.updateStats(this.props.playerName,this.props.stats)}updateStats(e,t){this.nameEl&&(this.nameEl.textContent=e||`Безымянный`),this.totalEl&&(this.totalEl.textContent=String(t.totalBattles)),this.winsEl&&(this.winsEl.textContent=String(t.wins)),this.lossesEl&&(this.lossesEl.textContent=String(t.losses)),this.drawsEl&&(this.drawsEl.textContent=String(t.draws)),this.historyList&&(this.historyList.innerHTML=t.history.length===0?`<li class="stats-history__empty">Пока нет боёв</li>`:t.history.map((e,n)=>`
            <li class="battle-record">
              <span class="battle-record__number">#${t.history.length-n}</span>
              <span class="battle-record__matchup">vs ${e.opponentName}</span>
              <span class="battle-record__result battle-record__result--${e.result}">${this.translateResult(e.result)}</span>
              <span class="battle-record__date">${e.date}</span>
            </li>
          `).join(``))}translateResult(e){return{win:`Победа`,loss:`Поражение`,draw:`Ничья`}[e]}render(){return`
      <img
        class="parchment__bg"
        src="./img/parchment/Parchment-curved-long.png"
        alt=""
        aria-hidden="true" />

      <div class="parchment__content">
        <div class="parchment__seal" aria-hidden="true"></div>

        <h2 class="stats-title">СТАТИСТИКА БОЕВ</h2>

        <dl class="stats-list" aria-live="polite" aria-atomic="false">
          <div class="stats-row stats-row--player">
            <dt>боец:</dt>
            <dd class="stats-value stats-player-name" data-stats-name>Безымянный</dd>
          </div>

          <div class="stats-summary">
            <div class="stats-row">
              <dt>всего боев:</dt>
              <dd class="stats-value" data-stats-total>0</dd>
            </div>
            <div class="stats-row">
              <dt>побед:</dt>
              <dd class="stats-value stats-value--win" data-stats-wins>0</dd>
            </div>
            <div class="stats-row">
              <dt>поражений:</dt>
              <dd class="stats-value stats-value--loss" data-stats-losses>0</dd>
            </div>
            <div class="stats-row">
              <dt>ничьи:</dt>
              <dd class="stats-value stats-value--draw" data-stats-draws>0</dd>
            </div>
          </div>
        </dl>

        <div class="stats-history">
          <h3 class="stats-history__title">Список Боев:</h3>
          <ul
            class="stats-history__list"
            data-battle-history
            aria-live="polite"
            aria-atomic="false">
          </ul>
        </div>
      </div>
    `}},T=[{id:`black-eyed-bruno`,name:`Черноглазый Бруно`,description:`Лесной разбойник с капюшоном и стрелами. Атакует сразу из двух позиций и часто критует.`,avatar:`./img/robbers/Black-Eyed-Bruno.png`,attackZonesCount:2,defenseZonesCount:1,baseDamage:24,critChance:25,critMultiplier:1.6,hp:85},{id:`gareth-red-scarf`,name:`Гарет Красный Шарф`,description:`Свободный наемник с тяжелой булавой. Защищает 3 зоны одновременно, пробить его трудно.`,avatar:`./img/robbers/Gareth-the-Red-Scarf.png`,attackZonesCount:1,defenseZonesCount:3,baseDamage:25,critChance:10,critMultiplier:1.5,hp:110},{id:`grim-silas`,name:`Мрачный Сайлас`,description:`Угрюмый бывший стражник. Предпочитает классическую стойку и выверенные контратаки.`,avatar:`./img/robbers/Grim-Silas.png`,attackZonesCount:1,defenseZonesCount:2,baseDamage:28,critChance:15,critMultiplier:1.5,hp:100},{id:`jack-cutthroat`,name:`Джек Головорез`,description:`Безумный головорез. Не заботится о собственной защите, делая ставку на максимальный урон.`,avatar:`./img/robbers/Jack-the-Cutthroat.png`,attackZonesCount:2,defenseZonesCount:1,baseDamage:32,critChance:20,critMultiplier:1.8,hp:100},{id:`jacques-rogue`,name:`Жак Плут`,description:`Бывший дуэлянт, ставший разбойником. Наносит быстрые выпады с огромным шансом крита.`,avatar:`./img/robbers/Jacques-the-Rogue.png`,attackZonesCount:1,defenseZonesCount:2,baseDamage:22,critChance:35,critMultiplier:1.5,hp:90},{id:`sly-barnaby`,name:`Хитрый Барнаби`,description:`Хитрый вымогатель. Выжидает ошибки игрока за глухой защитой и наносит редкие уколы.`,avatar:`./img/robbers/Sly-Barnaby.png`,attackZonesCount:1,defenseZonesCount:3,baseDamage:18,critChance:15,critMultiplier:2,hp:105}];function E(){return T[Math.floor(Math.random()*T.length)]}var D={"black-eyed-bruno":[`Хотел выбрать Бруно? Ха, его стрелы смотрят только в спины зазевавшихся путников!`,`Бруно не работает на новичков. Выберешь его — очнешься в канаве без гроша.`,`Серьезно? Этот малый замаскирован не для того, чтобы выполнять твои команды.`,`Бруно работает один. И точно не собирается делиться добычей с тобой!`],"gareth-red-scarf":[`Думал нанять Гарета? Его ржавая булава быстрее пробивает головы, чем слушает приказы!`,`Гарет подчиняется только звону монет и запаху эля. Ты пока не дорос!`,`Ха! Гарет носит этот шарф, чтобы не замараться кровью таких «командиров».`,`Старый ветеран разбоя не сошелся характерами с твоим меню выбора.`],"grim-silas":[`Сайлас молча угрюм и очень опасен. Застрять в твоем отряде — не его план.`,`Выбрать Сайласа? Он прожжет в тебе дыру одним взглядом, даже не вынимая кинжала.`,`Этот тип слишком угрюм для роли твоего аватара. Ищи кого-то повеселее!`,`Сайлас предпочитает засады в лесу, а не честные дуэли на вашей арене.`],"jack-cutthroat":[`Джек уже прикидывает вес твоего кошелька. Нажать «Выбрать» — роковая ошибка!`,`Один глаз Джека смотрит на твоё горло, а второй... а второго у него нет.`,`Этот повязанный шрамами головорез сам выберет, кого ему прирезать!`,`Джек не становится чьим-то аватаром. Он становится чьим-то кошмаром.`],"jacques-rogue":[`Жак тебе искренне улыбается... а его левая рука уже в твоем кармане!`,`Хочешь сыграть за Жака? Он заманит тебя в засаду раньше, чем начнется раунд.`,`Эта хитрая рожа продаст тебя бродячим собакам за полкружки кислого эля!`,`Жак слишком умен, чтобы рисковать шкурой ради твоих побед.`],"sly-barnaby":[`Барнаби предпочитает затянуться трубкой и выпить в таверне, а не драться за тебя!`,`Цветок на колпаке Барнаби — это знак, что он ложил болт на твои приказы.`,`Выбрать Барнаби? Он скорее обчистит твои сундуки, пока ты спишь.`,`Барнаби слишком ценит свободу (и чужое золото), чтобы стать чьей-то марионеткой.`]};function O(e){let t=D[e];return!t||!t.length?`Этот разбойник отказывается идти с тобой!`:t[Math.floor(Math.random()*t.length)]}var k=[...i,...T],A=class extends g{header=null;avatarPicker=null;characterDetails=null;battleStats=null;unsubscribeStore=null;constructor(){super({tagName:`div`,className:`character-wrapper`})}onMount(){this.initHeader(),this.initPicker(),this.initDetails(),this.initStats()}onUnmount(){this.unsubscribeStore?.(),this.header?.unmount(),this.avatarPicker?.unmount(),this.characterDetails?.unmount(),this.battleStats?.unmount()}initHeader(){let e=this.element.querySelector(`[data-header-slot]`);e&&(this.header=new x,this.header.mount(e))}initPicker(){let e=this.element.querySelector(`[data-picker-slot]`);if(!e)return;let t=f.getState().selectedAvatarId||`brandon-the-flayed`,n=k.map(e=>({id:e.id,name:e.name,avatar:e.avatar}));this.avatarPicker=new S({characters:n,selectedId:t,onSelect:this.onPickerSelect}),this.avatarPicker.mount(e)}initDetails(){let e=this.element.querySelector(`[data-details-slot]`);if(!e)return;let t=f.getState().selectedAvatarId||`brandon-the-flayed`,n=o(t);this.characterDetails=new C({character:this.mapToCharacterData(n,t),onSelect:this.onDetailsSelect}),this.characterDetails.mount(e)}initStats(){let e=this.element.querySelector(`[data-stats-slot]`);if(!e)return;let t=f.getState();this.battleStats=new w({playerName:t.playerName,stats:t.stats}),this.battleStats.mount(e),this.unsubscribeStore=f.subscribe(e=>{this.battleStats?.updateStats(e.playerName,e.stats)})}onPickerSelect=e=>{let t=k.find(t=>t.id===e.id);t&&(this.avatarPicker?.setActive(e.id),this.updateDetails(t))};onDetailsSelect=e=>{let t=e.fighter.id;f.setState({selectedAvatarId:t}),this.avatarPicker?.setSelected(t),this.updateDetails(e.fighter)};mapToCharacterData(e,t){let n=i.some(t=>t.id===e.id),r=e.id===t;return n?{fighter:e,isSelectable:!0,isSelected:r}:{fighter:e,isSelectable:!1,unselectableMessage:O(e.id)}}updateDetails(e){let t=f.getState().selectedAvatarId||`brandon-the-flayed`;this.characterDetails?.setCharacter(this.mapToCharacterData(e,t))}render(){return`
      <div data-header-slot></div>
      <main class="page character-page">
        <div data-picker-slot></div>
        <div data-details-slot></div>
        <div data-stats-slot></div>
      </main>
    `}},j=class extends g{header=null;errorHandler=null;unsubscribeStore=null;nameInput=null;volumeInput=null;volumeValue=null;errorEl=null;bgRadios=null;muteBtn=null;trackSelect=null;constructor(){super({tagName:`div`,className:`settings-wrapper`})}onMount(){this.initHeader(),this.cacheElements(),this.syncUIWithStore(),this.bindEvents(),this.unsubscribeStore=f.subscribe(this.handleStoreUpdate)}onUnmount(){this.unbindEvents(),this.unsubscribeStore?.(),this.header?.unmount(),this.errorHandler?.clear()}initHeader(){let e=this.element.querySelector(`[data-header-slot]`);e&&(this.header=new x,this.header.mount(e))}cacheElements(){this.nameInput=this.element.querySelector(`#settingsCharName`),this.volumeInput=this.element.querySelector(`#settingsMusicVolume`),this.volumeValue=this.element.querySelector(`#settingsVolumeValue`),this.errorEl=this.element.querySelector(`#settingsNameError`),this.bgRadios=this.element.querySelectorAll(`input[name="bgChoice"]`),this.muteBtn=this.element.querySelector(`[data-action="toggle-mute"]`),this.trackSelect=this.element.querySelector(`#settingsTrack`),this.errorEl&&this.nameInput&&(this.errorHandler=new v(this.errorEl,this.nameInput))}syncUIWithStore(){let e=f.getState();this.nameInput&&(this.nameInput.value=e.playerName||``),this.volumeInput&&(this.volumeInput.value=String(e.sound.musicVolume)),this.volumeValue&&(this.volumeValue.textContent=`${e.sound.musicVolume}%`);let t=e.selectedThemeId||`citadel`;this.bgRadios?.forEach(e=>{e.checked=e.value===t}),this.muteBtn&&(this.muteBtn.textContent=e.sound.isMuted?`Вкл`:`Выкл`),this.trackSelect&&(this.trackSelect.value=e.sound.bgMusicTrack||`Tavern-Dance-Loop`)}bindEvents(){this.volumeInput?.addEventListener(`input`,this.handleVolumeInput),this.nameInput?.addEventListener(`keydown`,this.handleNameKeydown),this.nameInput?.addEventListener(`blur`,this.handleNameBlur),this.bgRadios?.forEach(e=>{e.addEventListener(`change`,this.handleBgChange)}),this.muteBtn?.addEventListener(`click`,this.handleMuteClick),this.trackSelect?.addEventListener(`change`,this.handleTrackChange)}unbindEvents(){this.volumeInput?.removeEventListener(`input`,this.handleVolumeInput),this.nameInput?.removeEventListener(`keydown`,this.handleNameKeydown),this.nameInput?.removeEventListener(`blur`,this.handleNameBlur),this.bgRadios?.forEach(e=>{e.removeEventListener(`change`,this.handleBgChange)}),this.muteBtn?.removeEventListener(`click`,this.handleMuteClick),this.trackSelect?.removeEventListener(`change`,this.handleTrackChange)}handleVolumeInput=()=>{if(!this.volumeInput)return;let e=parseInt(this.volumeInput.value,10);this.volumeValue&&(this.volumeValue.textContent=`${e}%`),f.setState({sound:{...f.getState().sound,musicVolume:e}})};handleNameKeydown=e=>{e.key===`Enter`&&(e.preventDefault(),this.saveName(),this.nameInput?.blur())};handleNameBlur=()=>{this.saveName()};saveName(){if(!this.nameInput)return;this.errorHandler?.clear();let e=this.nameInput.value.trim(),t=_(e);if(!t.valid){this.errorHandler?.show(t.message),this.nameInput.value=f.getState().playerName||``;return}f.setState({playerName:e})}handleBgChange=e=>{let t=e.target;t.checked&&f.setState({selectedThemeId:t.value})};handleMuteClick=()=>{let e=f.getState();f.setState({sound:{...e.sound,isMuted:!e.sound.isMuted}})};handleTrackChange=()=>{this.trackSelect&&f.setState({sound:{...f.getState().sound,bgMusicTrack:this.trackSelect.value}})};handleStoreUpdate=e=>{this.muteBtn&&(this.muteBtn.textContent=e.sound.isMuted?`Вкл`:`Выкл`),this.trackSelect&&this.trackSelect.value!==e.sound.bgMusicTrack&&(this.trackSelect.value=e.sound.bgMusicTrack),this.nameInput&&document.activeElement!==this.nameInput&&(this.nameInput.value=e.playerName||``)};renderTrackOptions(){let e=f.getState().sound.bgMusicTrack;return s.map(t=>`<option value="${t.id}" ${t.id===e?`selected`:``}>${t.name}</option>`).join(``)}renderBgOptions(){let e=f.getState().selectedThemeId||`citadel`;return u.map(t=>`
      <label class="bg-option">
        <input
          type="radio"
          name="bgChoice"
          value="${t.id}"
          ${t.id===e?`checked`:``}
          class="visually-hidden" />
        <div class="bg-option__preview bg-option__preview--${t.id}"></div>
        <span class="bg-option__name">${t.name}</span>
      </label>
    `).join(``)}render(){return`
      <div data-header-slot></div>
      <main class="page settings-page">
        <section class="parchment parchment--long parchment--settings">
          <img
            class="parchment__bg"
            src="./img/parchment/Parchment-curved-long.png"
            alt=""
            aria-hidden="true" />
          <div class="parchment__seal" aria-hidden="true"></div>

          <div class="parchment__content">
            <h1 class="settings-title">Настройки</h1>

            <div class="settings-form">
              <div class="settings-group">
                <label for="settingsCharName" class="settings-label">Имя персонажа</label>
                <div class="input-group">
                  <input
                    type="text"
                    id="settingsCharName"
                    class="input-field input-field--parchment"
                    value=""
                    minlength="2"
                    maxlength="15"
                    autocomplete="off"
                    aria-describedby="settingsNameError"
                    aria-invalid="false" />
                  <p class="error-message" id="settingsNameError" aria-live="polite" hidden>
                    Имя должно быть от 2 до 15 символов
                  </p>
                </div>
              </div>

              <div class="settings-group settings-group--inline">
                <label for="settingsMusicVolume" class="settings-label">Громкость</label>
                <input
                  type="range"
                  id="settingsMusicVolume"
                  class="settings-slider"
                  min="0"
                  max="100"
                  value="50" />
                <span id="settingsVolumeValue" class="settings-value">50%</span>
              </div>

              <div class="settings-music-row">
                <span class="settings-label">Музыка</span>
                <button type="button" class="btn-mute" data-action="toggle-mute">Выкл</button>

                <span class="settings-label">Трек</span>
                <select id="settingsTrack" class="select-track">
                  ${this.renderTrackOptions()}
                </select>
              </div>

              <div class="settings-group" role="group" aria-labelledby="bg-label">
                <div id="bg-label" class="settings-label">Выберите фон</div>
                <div class="bg-options">
                  ${this.renderBgOptions()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    `}},M=class extends g{hp;hpFill=null;hpText=null;constructor(e){super({tagName:`div`,className:`fighter-card`,dataset:{fighter:e.type},props:e}),this.hp=e.currentHp}afterRender(){this.hpFill=this.element.querySelector(`.hp-fill`),this.hpText=this.element.querySelector(`[data-hp-current]`)}updateHp(e){this.hp=e;let t=this.hp/this.props.fighter.hp*100;this.hpFill&&(this.hpFill.style.width=`${t}%`),this.hpText&&(this.hpText.textContent=String(this.hp))}render(){let{type:e,fighter:t,name:n}=this.props;return`
      <div class="hp-bar">
        <div class="hp-fill" style="width: ${this.hp/t.hp*100}%"></div>
      </div>
      <div class="fighter">
        <div class="fighter-img-wrapper">
          <img class="fighter-img ${e===`player`?`fighter-img--player`:`fighter-img--opponent`}" src="${t.avatar}" alt="${t.name}" />
        </div>
        <div class="fighter-name-wrapper">
          <p class="fighter-name" data-fighter-name>${n}</p>
          <div class="fighter-tooltip">
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">HP:</span>
              <span class="fighter-tooltip__value">
                <span data-hp-current>${this.hp}</span>/<span data-hp-max>${t.hp}</span>
              </span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Атака:</span>
              <span class="fighter-tooltip__value" data-stat-attack>${t.attackZonesCount}</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Защита:</span>
              <span class="fighter-tooltip__value" data-stat-defense>${t.defenseZonesCount}</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Урон:</span>
              <span class="fighter-tooltip__value" data-stat-damage>${t.baseDamage}</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Шанс крита:</span>
              <span class="fighter-tooltip__value" data-stat-crit_chance>${t.critChance}%</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Множ. крита:</span>
              <span class="fighter-tooltip__value" data-stat-crit_multiplier>${t.critMultiplier}</span>
            </div>
          </div>
        </div>
      </div>
    `}},N={win:[{main:`ТРИУМФ!`,sub:`Соперник признал поражение и попросил не бить по лицу.`},{main:`ПОБЕДА!`,sub:`Разбойник с воплем выронил оружие и взмолился о пощаде.`},{main:`VICTORY!`,sub:`Бандит понял, что твоя броня ему не по зубам, и спешно удрал в кусты.`},{main:`ТРИУМФ!`,sub:`Подлый плут выбросил белый флаг из грязного носового платка.`},{main:`ПОБЕДА!`,sub:`Противник упал на колени и пообещал больше никогда не грабить путников.`},{main:`СЛАВА!`,sub:`Твой последний удар окончательно убедил разбойника сдать позиции.`},{main:`УСПЕХ!`,sub:`Грабитель отступил, громко ругаясь и держась за ушибленный бок.`},{main:`ПОБЕДА!`,sub:`Разбойник выронил дубину и с поклоном признал твою рыцарскую доблесть.`},{main:`ТРИУМФ!`,sub:`Враг понял, что с настоящим рыцарем шутки плохи, и позорно сбежал.`},{main:`СЛАВА!`,sub:`Противник отдаёт тебе свой последний кошель, лишь бы уйти целым.`}],loss:[{main:`ФИАСКО!`,sub:`Разбойник ловко сбил тебя с ног и покатился со смеху, пока ты вставал.`},{main:`НЕУДАЧА!`,sub:`Тяжёлые доспехи подвели — противник просто запыхал тебя и выбил меч.`},{main:`ОСЕЧКА!`,sub:`Подлый плут бросил песок в забрало и вынудил тебя временно отступить.`},{main:`УВЫ!`,sub:`Бандит подставил подножку, и твой рыцарь растянулся на траве.`},{main:`ФИАСКО!`,sub:`Стальной шлем съехал набок в самый ответственный момент дуэли.`},{main:`ПРОВАЛ!`,sub:`Разбойник выбил клинок из рук и с ухмылкой предложил взять реванш.`},{main:`ПРОВАЛ!`,sub:`Бандитская хитрость оказалась сильнее рыцарского напора.`},{main:`ОСЕЧКА!`,sub:`Твой щит застрял в земле, пришлось признать поражение в раунде.`},{main:`НЕУДАЧА!`,sub:`Кинжал разбойника нашел брешь в доспехе, рыцарю нужен передышка.`},{main:`ФИАСКО!`,sub:`Противник застал тебя расплох подсечкой. Сегодня удача на его стороне.`}],draw:[{main:`НИЧЬЯ!`,sub:`Оба бойца одновременно выронили оружие и тяжело уселись на траву.`},{main:`ТУПИК!`,sub:`Вы одновременно нанесли удары по щитам и выдохлись от усталости.`},{main:`ПАТ!`,sub:`Рыцарская честь и бандитская уловка оказались одинаково сильны.`},{main:`НИЧЬЯ!`,sub:`Оба соперника тяжело дышат и молча согласились разойтись миром.`},{main:`ТУПИК!`,sub:`Меч и кинжал скрестились так крепко, что бой зашёл в тупик.`},{main:`НИЧЬЯ!`,sub:`Разбойник выдохся, рыцарь запыхался — идеальное время сделать перерыв.`},{main:`НИЧЬЯ!`,sub:`Вы выбили оружие из рук друг друга. Поединок окончен ничем.`},{main:`ПАТ!`,sub:`Ни рыцарский напор, ни хитрость не принесли победы ни одному из вас.`},{main:`ПАТ!`,sub:`Оба бойца с трудом держатся на ногах и решили отложить дуэль.`},{main:`ТУПИК!`,sub:`Одновременный блок привел к тому, что оба увязли в защите.`}]};function P(e){let t=N[e];return t[Math.floor(Math.random()*t.length)]}var F=[{id:`head`,title:`Голова`},{id:`torso`,title:`Торс`},{id:`arms`,title:`Руки`},{id:`groin`,title:`Пах`},{id:`thighs`,title:`Бёдра`},{id:`legs`,title:`Ноги`}],I=class extends g{playerProfile;opponentProfile;playerCard=null;opponentCard=null;selectedDefense=[];selectedAttack=[];attackBtn=null;newBattleBtn=null;resultBlock=null;resultMainWord=null;resultSubText=null;defensePanel=null;attackPanel=null;constructor(e){super({tagName:`section`,className:`battle-arena`,attributes:{"aria-label":`Арена`},props:e}),this.playerProfile=e.player,this.opponentProfile=e.opponent}onMount(){this.cacheElements(),this.initFighterCards(),this.updatePanelUI(`defense`),this.updatePanelUI(`attack`),this.updateAttackButtonState(),this.bindEvents()}onUnmount(){this.playerCard?.unmount(),this.opponentCard?.unmount()}cacheElements(){this.attackBtn=this.element.querySelector(`#attackBtn`),this.newBattleBtn=this.element.querySelector(`[data-action="new-battle"]`),this.resultBlock=this.element.querySelector(`#battleResult`),this.resultMainWord=this.element.querySelector(`#resultMainWord`),this.resultSubText=this.element.querySelector(`#resultSubText`),this.defensePanel=this.element.querySelector(`#defensePanel`),this.attackPanel=this.element.querySelector(`#attackPanel`)}initFighterCards(){let e=this.element.querySelector(`[data-card-slot="player"]`),t=this.element.querySelector(`[data-card-slot="opponent"]`);!e||!t||(this.playerCard=new M({type:`player`,currentHp:this.playerProfile.hp,fighter:this.playerProfile,name:this.props.playerName||this.playerProfile.name}),this.opponentCard=new M({type:`opponent`,currentHp:this.opponentProfile.hp,fighter:this.opponentProfile,name:this.opponentProfile.name}),this.playerCard.mount(e),this.opponentCard.mount(t))}bindEvents(){this.defensePanel?.addEventListener(`click`,e=>this.handlePanelClick(e,`defense`)),this.attackPanel?.addEventListener(`click`,e=>this.handlePanelClick(e,`attack`)),this.attackBtn?.addEventListener(`click`,()=>{this.isReadyToAttack()&&this.props.onAttackSubmit([...this.selectedAttack],[...this.selectedDefense])}),this.newBattleBtn?.addEventListener(`click`,this.props.onNewBattle)}handlePanelClick(e,t){let n=e.target.closest(`.battle-zone`);n?.dataset.zone&&this.handleZoneSelect(t,n.dataset.zone)}handleZoneSelect(e,t){let{queue:n,maxLimit:r}=this.getQueueInfo(e),i=n.indexOf(t);i===-1?(n.length>=r&&n.shift(),n.push(t)):n.splice(i,1),this.updatePanelUI(e),this.updateAttackButtonState()}getQueueInfo(e){return e===`defense`?{queue:this.selectedDefense,maxLimit:this.playerProfile.defenseZonesCount}:{queue:this.selectedAttack,maxLimit:this.playerProfile.attackZonesCount}}isReadyToAttack(){return this.selectedDefense.length===this.playerProfile.defenseZonesCount&&this.selectedAttack.length===this.playerProfile.attackZonesCount}updatePanelUI(e){let t=e===`defense`?`defensePanel`:`attackPanel`,n=e===`defense`?`defenseCount`:`attackCount`,{queue:r,maxLimit:i}=this.getQueueInfo(e),a=this.element.querySelector(`#${t}`);if(!a)return;a.querySelectorAll(`.battle-zone`).forEach(e=>{let t=e.dataset.zone?r.includes(e.dataset.zone):!1;e.setAttribute(`aria-pressed`,String(t)),e.classList.toggle(`battle-zone--selected`,t)});let o=this.element.querySelector(`#${n}`);o&&(o.textContent=`(${r.length}/${i})`)}updateAttackButtonState(){this.attackBtn&&(this.attackBtn.disabled=!this.isReadyToAttack())}resetSelections(){this.selectedDefense=[],this.selectedAttack=[],this.updatePanelUI(`defense`),this.updatePanelUI(`attack`),this.updateAttackButtonState()}updateHp(e,t){e===`player`?this.playerCard?.updateHp(t):this.opponentCard?.updateHp(t)}showResult(e){if(!this.resultBlock||!this.resultMainWord||!this.resultSubText)return;let t=P(e);this.resultBlock.className=`battle-result battle-result--${e}`,this.resultMainWord.textContent=t.main,this.resultSubText.textContent=t.sub,this.resultBlock.hidden=!1,this.attackBtn&&(this.attackBtn.hidden=!0),this.disableControls()}disableControls(){this.element.querySelectorAll(`.zones-panel`).forEach(e=>{e.style.pointerEvents=`none`,e.style.opacity=`0.5`})}resetBattle(e,t){this.playerProfile=e,this.opponentProfile=t,this.playerCard?.unmount(),this.opponentCard?.unmount(),this.playerCard=null,this.opponentCard=null,this.initFighterCards(),this.resetResultUI(),this.enableControls(),this.updateAttackButtonState()}resetResultUI(){this.resultBlock&&(this.resultBlock.hidden=!0),this.resultMainWord&&(this.resultMainWord.textContent=``),this.resultSubText&&(this.resultSubText.textContent=``),this.attackBtn&&(this.attackBtn.hidden=!1)}enableControls(){this.element.querySelectorAll(`.zones-panel`).forEach(e=>{e.style.pointerEvents=``,e.style.opacity=``})}renderZoneButtons(){return F.map(({id:e,title:t})=>`
      <button class="battle-zone" type="button" data-zone="${e}" title="${t}" aria-pressed="false">
        <span class="battle-zone__icon" aria-hidden="true"></span>
      </button>
    `).join(``)}render(){let e=this.playerProfile,t=this.renderZoneButtons();return`
      <div class="fighter-side fighter-side--player">
        <h2 class="visually-hidden">Боец игрока</h2>

        <fieldset class="zones-panel zones-panel--defense" id="defensePanel" data-required="${e.defenseZonesCount}">
          <legend class="zones-panel__title">
            Защита
            <span class="zones-panel__count" id="defenseCount">(0/${e.defenseZonesCount})</span>
          </legend>
          <div class="slots">${t}</div>
        </fieldset>

        <div data-card-slot="player"></div>
      </div>

      <div class="battle-center">
        <button class="btn btn--attack" id="attackBtn" type="button" disabled>ВПЕРЁД!</button>

        <div class="battle-result" id="battleResult" hidden>
          <p class="battle-result__title">
            <span class="battle-result__main" id="resultMainWord">ПОБЕДА</span>
            <span class="battle-result__sub" id="resultSubText">Враг повержен.</span>
          </p>
          <button type="button" class="btn btn--new-battle" data-action="new-battle">Новый бой</button>
        </div>
      </div>

      <div class="fighter-side fighter-side--opponent">
        <h2 class="visually-hidden">Боец противника</h2>

        <div data-card-slot="opponent"></div>

        <fieldset class="zones-panel zones-panel--attack" id="attackPanel" data-required="${e.attackZonesCount}">
          <legend class="zones-panel__title">
            Атака
            <span class="zones-panel__count" id="attackCount">(0/${e.attackZonesCount})</span>
          </legend>
          <div class="slots">${t}</div>
        </fieldset>
      </div>
    `}},L={head:`Голова`,torso:`Торс`,arms:`Руки`,groin:`Яйки`,thighs:`Бёдра`,legs:`Ноги`};function R(e){return L[e]||e}var z=class extends g{rounds=[];intro=``;outro=``;logContainer=null;constructor(e=[]){super({tagName:`section`,className:`battle-log`,props:e}),this.rounds=e}afterRender(){this.logContainer=this.element.querySelector(`.log-container`)}scrollToBottom(){this.logContainer&&(this.logContainer.scrollTop=this.logContainer.scrollHeight)}addPhrase(e,t){e===`intro`?this.intro=t:this.outro=t,this.update(),this.scrollToBottom()}addRound(e){this.rounds=[...this.rounds,e],this.update(),this.scrollToBottom()}clear(){this.rounds=[],this.intro=``,this.outro=``,this.update()}renderActionLine(e){let t=`<span class="log-actor">${e.attacker}</span>`,n=`<span class="log-actor">${e.target}</span>`,r=`<span class="log-zone">«${R(e.zone)}»</span>`,i=`<span class="log-damage">${e.damage} урона</span>`,a,o;return e.isCritical&&e.isBlocked?(a=`<span class="log-status log-status--crit">Критический</span> удар ${t} <span class="log-status log-status--pierce_block">пробивает</span> блок ${n} в зоне ${r} и наносит ${i}!`,o=`crit-pierce`):e.isCritical?(a=`<span class="log-status log-status--crit">Критический</span> удар ${t} наносит ${i} по ${n} в зону ${r}!`,o=`crit`):e.isBlocked?(a=`${t} атакует в зону ${r}, но ${n} успешно <span class="log-status log-status--block">блокирует</span> удар!`,o=`blocked`):(a=`${t} наносит ${i} по ${n} в зону ${r}!`,o=`hit`),`<p class="log-entry log-entry--${o}">${a}</p>`}renderRoundHTML(e,t){return`
      <div class="log-round" data-round="${e}">
        <div class="log-round__header">| РАУНД ${e} |</div>
        <div class="log-round__content">${t.map(e=>this.renderActionLine(e)).join(``)}</div>
      </div>
    `}renderPhrase(e,t){return`
      <div class="log-round log-round--${e}">
        <div class="log-round__content">
          <p class="log-phrase log-phrase--${e}">${t}</p>
        </div>
      </div>
    `}render(){let e=this.intro?this.renderPhrase(`intro`,this.intro):``,t=this.outro?this.renderPhrase(`outro`,this.outro):``;return`
      <img
        class="battle-log__bg"
        src="./img/parchment/Parchment-curved-short.png"
        alt=""
        aria-hidden="true" />

      <div class="parchment__content" id="battleLog" aria-live="polite" aria-atomic="false">
        <h2 class="visually-hidden">ЖУРНАЛ БОЯ</h2>

        <div class="log-container" data-log-container>
          ${e}
          ${this.rounds.map((e,t)=>this.renderRoundHTML(t+1,e)).join(``)}
          ${t}
        </div>
      </div>
    `}};function B(e,t){let n=0,r=[];for(let i of e.attackZones){let a=t.defenseZones.includes(i.zone),o=!a||i.isCritical,s=0;if(o){let t=i.isCritical?e.baseDamage*e.critMultiplier:e.baseDamage;s=Math.round(t),n+=s}r.push({attacker:e.name,target:t.name,zone:i.zone,damage:s,isCritical:i.isCritical,isBlocked:a})}return{damageDealt:n,logs:r}}function V(e,t){let n=B(e,t),r=B(t,e);return{logs:[...n.logs,...r.logs],opponentDamageTaken:n.damageDealt,playerDamageTaken:r.damageDealt}}function H(e){return Math.random()<e/100}function U(e,t){let n=[...e];for(let e=n.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[n[e],n[t]]=[n[t],n[e]]}return n.slice(0,t)}var W=class{hp;constructor(e=0){this.hp=e}getHp(){return this.hp}takeDamage(e){e<=0||(this.hp=Math.max(0,this.hp-e))}isAlive(){return this.hp>0}},G={"black-eyed-bruno":{forest:[`Бруно спрыгнул с ветки и натянул тетиву: «Лес — моя территория, рыцарь!»`,`Из-за густой листвы вылетел Бруно: «Твои доспехи слишком громко звенят!»`,`Бруно достает стрелу: «В чаще твоё железо тебе не поможет!»`,`Шорох кустов, и Бруно блокирует тропу: «Кошелек или засада?»`,`Бруно целится из лука: «Лесные тропы платят мне дань!»`],fortress:[`Бруно пригнулся у замковых стен: «Стены высоки, но мои стрелы выше!»`,`Из тени крепостной башни выходит Бруно: «Ищешь славы у старых стен?»`,`Бруно натягивает тетиву: «Каменные стены отлично рикошетят!»`,`Бруно встал у подъемного моста: «Дальше только через мою стрелу!»`,`Бруно прячется за зубцом: «Твоя броня — отличная мишень у крепости!»`],citadel:[`Бруно на парапете цитадели: «Даже у палат лорда ты не защищен!»`,`Бруно у величественных ворот: «Здесь решается, кто настоящий хозяин!»`,`Бруно выглядывает из-за колонны: «В мраморе цитадели стрелы видна лучше!»`,`Бруно у эшафота цитадели: «Лорды далеко, а мой лук близко!»`,`Бруно заступил путь: «Королевская цитадель не спасет от меткого глаза!»`]},"gareth-red-scarf":{forest:[`Гарет вонзает булаву в пень: «В чаще за твои доспехи дадут хорошую цену!»`,`Гарет поправляет шарф: «Лесные волки скоро поужинают твоей гордостью!»`,`Гарет заступает тропу: «В этой чаще рыцари ломаются быстрее всего!»`,`Гарет взмахивает булавой: «Деревья помнят сотни таких, как ты!»`,`Гарет ухмыляется из-за дуба: «Твоя броня здесь только мешает!»`],fortress:[`Гарет у ржавых ворот: «Я штурмовал эти стены, а тебя просто раздавлю!»`,`Гарет стучит булавой по шлему: «В стенах крепости твои крики звучат громче!»`,`Гарет опирается на стены: «Старый ветеран покажет тебе настоящий штурм!»`,`Гарет ждет у моста: «Крепость моя, и плата за проход — твой меч!»`,`Гарет рычит: «Камни помнят кровь, сейчас добавим твоей!»`],citadel:[`Гарет у подножия цитадели: «Даже у замка лорда я беру свое!»`,`Гарет сплевывает на мрамор: «Красивый замок, жаль, ты упадешь на эти плиты!»`,`Гарет поднимает булаву: «Твоя благородная цитадель станет твоим склепом!»`,`Гарет у главных ворот: «Слуги лорда не успеют тебе помочь!»`,`Гарет с ухмылкой: «Думал, у цитадели ты в безопасности?»`]},"grim-silas":{forest:[`Сайлас бесшумно выходит из тумана: «В этом лесу слышен только твой страх.»`,`Сайлас достает кинжал: «Тень деревьев станет твоим саваном.»`,`Сайлас молча указывает лезвием на твоё горло.`,`Сайлас растворяется среди деревьев: «Слишком много шума, рыцарь.»`,`Сайлас блокирует тропу: «Лес молчит, и ты замолчишь.»`],fortress:[`Сайлас выходит из тени стены: «Камни не укроют от моего клинка.»`,`Сайлас стоит на страже руин: «Ты совершил ошибку, придя к крепости.»`,`Сайлас молча обнажает сталь у подъемного моста.`,`Сайлас смотрит свысока: «Тень башни уже накрыла тебя.»`,`Сайлас тихим голосом: «Здесь никто не услышит твоих мольб.»`],citadel:[`Сайлас у высоких колонн: «Даже в замке лорда смерть ходит бесшумно.»`,`Сайлас из тени барельефа: «Цитадель блестит, но твой доспех потемнеет.»`,`Сайлас молча делает шаг вперед, сжимая рукоять.`,`Сайлас у ворот: «Величественные стены не спасут от точного удара.»`,`Сайлас тихо: «Твой путь завершится прямо на этих плитах.»`]},"jack-cutthroat":{forest:[`Джек поправляет повязку: «В этой чаще твоё горло выглядит очень заманчиво!»`,`Джек достает кинжал: «Лесные звери любят рыцарей!»`,`Джек оскалился: «Твои доспехи звенят как кошелек, давай проверим!»`,`Джек режет ветку: «Сейчас нарезка будет из твоей защиты!»`,`Джек выпрыгивает из кустов: «Один глаз видит тебя насквозь!»`],fortress:[`Джек у бойниц: «Отличный вид, чтобы сбросить тебя вниз!»`,`Джек проводит пальцем по лезвию: «Крепость помнит резню, добавим еще!»`,`Джек перекрывает проход: «У стен крепости скидок не бывает!»`,`Джек у рва: «Вода у стен быстро покроется твоим позором!»`,`Джек орет: «Эй, рыцарь, готовься расстаться со шкурой!»`],citadel:[`Джек у ворот цитадели: «Даже лорд не платит мне столько, сколько я сниму с тебя!»`,`Джек чешет шрам: «Богатая цитадель, богатая добыча!»`,`Джек на ступенях замка: «На этих плитах твое железо будет красиво звенеть!»`,`Джек заносит кинжал: «Рыцари в цитадели обычно самые мягкие!»`,`Джек оскалился: «Цитадель станет свидетелем твоей глупости!»`]},"sly-barnaby":{forest:[`Барнаби подбрасывает монетку: «Лес велик, а твой кошелек скоро станет моим!»`,`Барнаби кланяется: «Добро пожаловать в мой лесной офис, сэр рыцарь!»`,`Барнаби ухмыляется: «Заблудился в чаще? Проводник стоит всех твоих доспехов!»`,`Барнаби подмигивает: «Смотри под ноги, тут везде мои ловушки!»`,`Барнаби прячет руки: «Какая встреча! А у меня как раз пусто в кармане.»`],fortress:[`Барнаби у ворот: «Проход платный, а для рыцарей — вдвое дороже!»`,`Барнаби опирается на стены: «Крепость старая, а уловки у меня свежие!»`,`Барнаби кланяется: «Сними шлем, сэр, на солнце он слишком ослепляет!»`,`Барнаби указывает на ров: «Выбирай: сдаешься или учишься плавать в броне?»`,`Барнаби подмигивает: «Стены крепкие, но твой доспех я вскрою!»`],citadel:[`Барнаби у ворот цитадели: «Ого, какой блестящий рыцарь! Заберу всё до нитки!»`,`Барнаби подбрасывает кинжал: «У цитадели всегда самый богатый улов!»`,`Барнаби с улыбкой: «Слуги лорда смотрят, не опозорься!»`,`Барнаби потирает руки: «Золоченые доспехи — мой любимый фасон!»`,`Барнаби кланяется: «Приветствую в цитадели! Справку о сдаче оружия подготовить?»`]},"jacques-rogue":{forest:[`Жак выдувает дым из трубки: «Эй, рыцарь, ты мешаешь мне наслаждаться лесом!»`,`Жак поправляет цветок: «Опять железяка шумит на весь лес...»`,`Жак потягивается: «Придется размяться, раз уж ты приперся в эту чащу.»`,`Жак вздыхает: «Лес был таким тихим, пока не появился ты со своим мечом.»`,`Жак ухмыляется через дым: «Давай побыстрее, у меня суп остывает!»`],fortress:[`Жак сидит на камне у крепости: «Надеюсь, твои доспехи ломаются быстро.»`,`Жак поправляет колпак: «У стен крепости сквозняк, давай закроем вопрос!»`,`Жак выбивает трубку: «Ну вот, из-за тебя табак рассыпал!»`,`Жак зевает: «Крепость, рыцарь, дуэль... Как же всё это предсказуемо!»`,`Жак с цветком за ухом: «Побью тебя и пойду искать пивоварню!»`],citadel:[`Жак на ступенях цитадели: «В таких местах должны быть девушки, а не ты!»`,`Жак выпустил колечко дыма: «Цитадель пышная, а ты слишком серьезный!»`,`Жак сморщился: «Твой полированный доспех слепит глаза, завязывай!»`,`Жак опирается на перила: «Быстро подеремся — и я свободен!»`,`Жак поправляет колпак: «Даже у палат лорда ты выглядишь неуклюже!»`]}};function K(e,t){let n=G[e];if(!n||!n[t])return`Противник готовится к бою!`;let r=n[t];return r[Math.floor(Math.random()*r.length)]}var q={"black-eyed-bruno":{forest:{win:[`Бруно роняет лук и застревает в кустах: «Всё-всё, чаща твоя!»`,`Бруно взмахивает руками: «Тетива порвалась, победа не считается... но я ухожу!»`,`Бруно уползает в папоротник: «В следующий раз встретимся у реки!»`,`Бруно бросает стрелы на траву: «Твоя броня слишком крепкая для моих стрел!»`,`Бруно утирает пот: «Ты победил, рыцарь, но я запомнил твой щит!»`],loss:[`Бруно ухмыляется с ветки: «Лес защищает своих! Учись уворачиваться!»`,`Бруно прячет лук: «Рыцари в доспехах слишком медленны для этой чащи.»`,`Бруно подмигивает: «Твой меч хорош, но стрела оказалась быстрее!»`,`Бруно забирает тул: «Сегодня победа за мной, ищи дорогу назад!»`,`Бруно исчезает в кроне деревьев с победным хохотом.`],draw:[`Бруно опустошил колчан, ты выдохся: «Разойдёмся, пока волки не пришли!»`,`Бруно садится на пень: «Оба без сил... Лесная ничья!»`,`Бруно опускает лук: «Ты не попал, я не пробил. Мир!»`,`Стрела сбила твой клинок, оба остались без оружия.`,`Бруно салютует луком: «Достойный бой, но продолжать бессмысленно!»`]},fortress:{win:[`Бруно прижимается к стене: «Сдаюсь, у этих ворот ты хозяин!»`,`Бруно бросает лук на камни: «От твоих ударов стены дрожат, я пасую!»`,`Бруно спиной отступает за мост: «Крепость твоя, рыцарь!»`,`Бруно держится за ушибленный бок: «Дуэль у стен я проиграл...»`,`Бруно машет носовым платком из-за зубца башни.`],loss:[`Бруно на башне: «Стены крепости сыграли за меня, рыцарь!»`,`Бруно с ухмылкой: «Тяжёлая броня у стен — плохая идея!»`,`Бруно салютует стрелой: «Отправляйся на отдых, сэр рыцарь!»`,`Бруно перепрыгивает ров: «Сегодня крепость остаётся разбойникам!»`,`Бруно оскалился: «Замковые тени — лучшие помощники!»`],draw:[`Бруно и ты упёрлись в ворота без сил: «Пауза, рыцарь!»`,`Эхо у стен заглушило финальный удар — оба бойца выдохлись.`,`Бруно опускает оружие: «Ничья у крепости — редкий исход!»`,`Оба щита разбиты, лук сломан. Бой окончен ничем.`,`Бруно садится на камни: «Отдохнём и разойдёмся!»`]},citadel:{win:[`Бруно падает на мрамор: «Ладно, пред палатами лорда ты сильнее!»`,`Бруно отползает к колонне: «Мои стрелы отскакивают от твоих лат!»`,`Бруно поднимает руки: «Цитадель твоя, я ухожу через чёрный ход!»`,`Бруно выбивают лук: «Твоя доблесть оказалась выше!»`,`Бруно прячется за статую: «Победа за тобой, рыцарь!»`],loss:[`Бруно на балконе цитадели: «Даже богатые доспехи не спасли!»`,`Бруно смеётся: «Цитадель увидела твоё падение, сэр!»`,`Бруно кланяется: «Спасибо за дуэль на таком красивом паркете!»`,`Бруно забирает трофей: «Слуги лорда всё видят — я выиграл!»`,`Бруно поправляет капюшон: «Победа в стенах замка за мной!»`],draw:[`Бруно опускает руки: «В цитадели шум поднимать не стоит, ничья!»`,`Вы оба тяжело дышите у мраморных колонн.`,`Бруно: «Стража уже близко, объявляю ничью!»`,`Стрела и меч скрестились намертво — ничья!`,`Бруно подмигивает: «Ничья у всех на виду!»`]}},"gareth-red-scarf":{forest:{win:[`Гарет роняет булаву в траву: «Твой напор перебил мою палицу...»`,`Гарет утирает кровь с губы: «Хороший удар, рыцарь. Чаща твоя!»`,`Гарет тяжело садится на пень: «Старый ветеран признаёт поражение.»`,`Гарет поправляет шарф: «Ты бьёшь сильнее лесного медведя!»`,`Гарет хромает в кусты: «Сегодня удача на твоей стороне!»`],loss:[`Гарет хохочет: «Булава старого Гарета ещё помнит, как побеждать!»`,`Гарет опирается на палицу: «Твои доспехи смялись, учись защите!»`,`Гарет подкручивает ус: «Лес любит опытных бойцов!»`,`Гарет салютует тяжелым кулаком: «Вставай, рыцарь, бой за мной!»`,`Гарет поправляет шарф: «Вернись, когда подточишь меч!»`],draw:[`Гарет и ты одновременно вонзили оружие в землю: «Устали оба!»`,`Гарет отмахивается: «Удары равны, разойдёмся по-хорошему!»`,`Оба бойца тяжело дышат, опираясь друг на друга.`,`Гарет рычит: «Ничья! Никто не уступил ни шагу!»`,`Гарет вытирает пот: «Равный бой в густой чаще!»`]},fortress:{win:[`Гарет падая опирается на стену: «Мощный напор, стены выдержали, я — нет!»`,`Гарет бросает булаву: «Твой меч пробил мою оборону!»`,`Гарет опускает голову: «Крепостные стены видят твою победу.»`,`Гарет с уважением: «Рыцарский напор сломал мою палицу!»`,`Гарет отступает к воротам: «Ухожу, дуэль за тобой!»`],loss:[`Гарет стучит булавой по щиту: «Крепость не взята, рыцарь!»`,`Гарет смеётся: «Старые стены помнят моих предков, а ты упал!»`,`Гарет победно поднимает палицу над головой.`,`Гарет поправляет helmet: «Твой доспех зазвенел от мощи!»`,`Гарет: «У стен этой крепости я не проигрываю!»`],draw:[`Булава и меч звенят обоюдным блоком — ничья у ворот!`,`Гарет садится на камни: «Оба крепки, как эти стены!»`,`Эхо от ударов утихло — боевой пат!`,`Гарет: «Ни я тебя, ни ты меня. Перерыв!»`,`Вы одновременно сделали шаг назад от усталости.`]},citadel:{win:[`Гарет падая на колени: «На мраморе цитадели ты оказался сильнее!»`,`Гарет опускает булаву: «Твой меч блестит победой, сэр!»`,`Гарет с поклоном: «Замковый двор признаёт твоё превосходство!»`,`Гарет тяжело дышит: «Достойный бой в палатах лорда!»`,`Гарет отступает за воротную башню: «Твой триумф!»`],loss:[`Гарет стоит над уставшим рыцарем: «Цитадель остаётся за мной!»`,`Гарет подбрасывает булаву: «Пышный замок, отличная победа!»`,`Гарет с ухмылкой: «Твои благородные доспехи не помогли!»`,`Гарет салютует: «Сегодня на мраморе победил Красный Шарф!»`,`Гарет: «Потренируйся перед следующим визитом в цитадель!»`],draw:[`Гарет и рыцарь опустили оружие на паркет цитадели.`,`Гарет: «Дуэль в замке окончена вничью!»`,`Оба бойца сошлись в мёртвом клинче и разошлись.`,`Гарет вытирает лоб: «Бой достоин быть записан в летопись!»`,`Равный поединок у всех на виду.`]}},"grim-silas":{forest:{win:[`Сайлас молча роняет кинжал и растворяется в тумане.`,`Сайлас кивает: «Твой клинок оказался быстрее тени...»`,`Сайлас отступает в кусты, признавая поражение.`,`Сайлас убирает сталь в ножны: «Чаща выбрала тебя.»`,`Сайлас прижимает руку к доспеху и бесшумно уходит.`],loss:[`Сайлас возникает за спиной: «Тень оказалась быстрее.»`,`Сайлас молча указывает кинжалом на твой опущенный щит.`,`Сайлас скрывается в чаще с тихим шелестом победы.`,`Сайлас: «Лес хранит молчание о твоём фиаско.»`,`Сайлас делает холодный поклон и исчезает.`],draw:[`Два клинка застыли в дюйме от брони — молчаливая ничья.`,`Сайлас и рыцарь одновременно опустили оружие.`,`Туман накрывает обоих бойцов — ничья в чаще.`,`Сайлас скрывается, не завершив удар.`,`Тишина леса подтверждает равный исходы дуэли.`]},fortress:{win:[`Сайлас отступает к бойнице: «Камни помнят твой удар.»`,`Сайлас опускает кинжал: «Ты пробил тень крепости.»`,`Сайлас молча признает твою победу у старых стен.`,`Сайлас растворяется в тени башни, оставляя путь.`,`Сайлас кивает рыцарю и убирает клинок.`],loss:[`Сайлас на зубце стены: «Крепость бережёт молчаливых.»`,`Сайлас подставляет кинжал к забралу: «Бой окончен.»`,`Сайлас бесшумно побеждает у подъемного моста.`,`Сайлас: «Твой доспех зазвенел слишком громко.»`,`Сайлас уходит в тень руин победителем.`],draw:[`Кинжал застрял в щите, меч в камне — ничья у ворот.`,`Сайлас отступает без единого слова.`,`Оба бойца замёрзли в боевой стойке — пат!`,`Сайлас растворяется, оставляя поединок ничейным.`,`Мрачные стены стали свидетелями равного боя.`]},citadel:{win:[`Сайлас на мраморе: «Даже в свете цитадели твой меч точен.»`,`Сайлас отходит к колоннаде: «Победа за тобой.»`,`Сайлас кивает, признавая рыцарский триумф.`,`Сайлас убирает оружие у палат лорда.`,`Сайлас исчезает за гобеленом цитадели.`],loss:[`Сайлас над рыцарем: «Свет цитадели не спас от тени.»`,`Сайлас молча опускает клинок.`,`Сайлас побеждает на глазах у всей цитадели.`,`Сайлас: «Твой блеск ослепил тебя самого.»`,`Сайлас бесшумно покидает пышный зал победителем.`],draw:[`Сайлас и рыцарь застыли у колонны — равный поединок.`,`Кинжал и меч скрестились перед палатами.`,`Сайлас подмигивает из тени: «Ничья в замке.»`,`Оба бойца отступают одновременно.`,`Молчаливый пат на мраморном полу.`]}},"jack-cutthroat":{forest:{win:[`Джек роняет кинжал: «Ой-ой! Мой единственный глаз меня подвёл!»`,`Джек хватается за бок: «Всё, рыцарь, не режь! Забирай тропу!»`,`Джек с воплем убегает в кусты: «Я ещё вернусь за кошельком!»`,`Джек отползает: «Ты бьёшь без уважения к разбойникам!»`,`Джек поднимает руки: «Сдаюсь! Твой меч слишком длинный!»`],loss:[`Джек оскалился: «Один глаз, а попал точно в цель!»`,`Джек подбрасывает кинжал: «Лесной дуэль за Головолозом!»`,`Джек хохочет: «Твой кошелёк стал ближе, рыцарь!»`,`Джек танцует на траве: «Учись уворачиваться от лезвия!»`,`Джек: «Сегодня в чаще правит мой кинжал!»`],draw:[`Джек и рыцарь сцепились и вместе упали в грязь.`,`Джек опух от усталости: «Разойдёмся, пока оба целы!»`,`Джек: «Один-один! Мой кинжал против твоего щита!»`,`Вы оба тяжело дышите посреди лесной поляны.`,`Джек подмигивает здоровым глазом: «Ничья в кустах!»`]},fortress:{win:[`Джек у рва: «Не толкайся! Сдаюсь, крепость твоя!»`,`Джек роняет оружие: «Твой шлем прочнее моего кинжала!»`,`Джек прижимается к воротам: «Пощади, сэр рыцарь!»`,`Джек с досадой сплевывает: «Победа за железным парнем!»`,`Джек хромает от стен: «Дуэль проиграна...»`],loss:[`Джек на воротах: «Крепость под контролем Джека!»`,`Джек хвастается кинжалом: «Стены помнят мою победу!»`,`Джек: «Твой доспех отлично зазвенел от падения!»`,`Джек с ухмылкой: «Головорез снова на коне!»`,`Джек салютует у рва: «Уходи с миром, рыцарь!»`],draw:[`Джек упёрся в твой щит: «Ничья у крепостных ворот!»`,`Кинжал застрял в доспехе, меч — в стене.`,`Джек вытирает пот: «Оба хороши, перерыв!»`,`Оба бойца уселись у подъемного моста.`,`Джек: «Ничья! Замковые ворон подтвердят!»`]},citadel:{win:[`Джек падая на паркет: «В цитадели ты дёрешься как лев!»`,`Джек роняет шляпу: «Забирай триумф, сэр!»`,`Джек отползает за колонну: «Больше не граблю у замка!»`,`Джек поджимает хвост: «Твоя доблесть победила!»`,`Джек с поклоном: «Победа рыцаря засчитана!»`],loss:[`Джек у палат лорда: «Победа прямо в центре цитадели!»`,`Джек подбрасывает шляпу: «Блестящие латы не спасли!»`,`Джек оскалился: «На мраморе я дерусь лучше!»`,`Джек салютует кинжалом: «Королевский триумф Джека!»`,`Джек с ухмылкой: «Цитадель видела твое поражение!»`],draw:[`Джек и рыцарь синхронно опустили оружие в замке.`,`Джек: «Ничья перед лицом самого лорда!»`,`Оба бойца выдохлись на мраморных плитах.`,`Джек: «Кинжал и меч равны в этом зале!»`,`Боевой пат в стенах цитадели.`]}},"sly-barnaby":{forest:{win:[`Барнаби роняет трубку: «Ой, мой табак! Ладно-ладно, ты победил!»`,`Барнаби поправляет колпак: «Выбил дубину... Пойду искать новую в лесу.»`,`Барнаби садится на пень: «Всё, выдохся! Чаща твоя, сэр рыцарь.»`,`Барнаби с улыбкой: «Твой напор сожрал весь мой суп, ухожу!»`,`Барнаби утирает лоб: «Убедил! Твой меч действительно острый.»`],loss:[`Барнаби пускает колечко дыма: «Отдыхай на траве, рыцарь, бой за мной!»`,`Барнаби поправляет цветок: «Железяка устала, а Барнаби свеж!»`,`Барнаби с ухмылкой: «Суп ещё не остыл, а ты уже на земле!»`,`Барнаби подмигивает: «Лесной отдых полезен после поражения!»`,`Барнаби зевает: «Хороший бой, но мой колпак остался на месте!»`],draw:[`Барнаби выбивает трубку: «Ничья! Пойдем перекусим?»`,`Оба бойца одновременно уселись на поляне уставшими.`,`Барнаби поправляет цветок: «Разойдёмся миром в этой чаще!»`,`Барнаби с улыбкой: «Твой удар хорош, мой блок тоже. Пат!»`,`Дым от трубки застилает ничейный исход дуэли.`]},fortress:{win:[`Барнаби у стены: «Сквозняк пробил мою защиту! Сдаюсь!»`,`Барнаби бросает палицу: «Твой доспех прочнее крепостных камней!»`,`Барнаби садится на валун: «Ты победил, пойду искать пивоварню...»`,`Барнаби роняет колпак: «У ворот ты оказался сильнее!»`,`Барнаби машет рукой: «Всё-всё, дуэль за тобой!»`],loss:[`Барнаби опирается на стены: «Крепость помнит, кто здесь хозяин!»`,`Барнаби пускает дым: «Тяжёлая броня застряла у ворот!»`,`Барнаби улыбается: «Барнаби побеждает у старых стен!»`,`Барнаби салютует трубкой: «Попробуй штурмовать снова!»`,`Барнаби: «Дуэль у замка закончена моей победой!»`],draw:[`Барнаби и ты упёрлись в ворота: «Ничья у крепости!»`,`Барнаби подправляет цветок: «Оба устали, объявляю перерыв!»`,`Звон клинков утих — равный исход боя.`,`Барнаби зевает: «Ничья, пойду передохну на камушке.»`,`Оба бойца опустили щиты у подъемного моста.`]},citadel:{win:[`Барнаби падает на паркет: «В цитадели ты дерёшься на славу!»`,`Барнаби роняет цветок: «Эх, запятнал колпак... Победа твоя!»`,`Барнаби поднимает руки: «Палаты лорда признают рыцаря!»`,`Барнаби отступает: «Твой меч оказался быстрее трубки!»`,`Барнаби с поклоном: «Триумф на мраморных плитах!»`],loss:[`Барнаби на ступенях: «Девушки видят — Барнаби победил!»`,`Барнаби выпускает колечко дыма: «Цитадель покорена!»`,`Барнаби поправляет колпак: «Рыцарь на паркете, я на коне!»`,`Барнаби с улыбкой: «Даже у замка лорда я у руля!»`,`Барнаби подмигивает: «Красивый зал для моей победы!»`],draw:[`Барнаби пускает дым у колонны: «Ничья! Палаты лорда подождут!»`,`Барнаби и рыцарь застыли у статуи: «Ничья на паркете!»`,`Барнаби поправляет колпак: «Оба выдохлись у ворот цитадели!»`,`Барнаби подмигивает: «Кинжал и меч равны перед лицом лорда!»`,`Барнаби садится на мраморные ступени: «Боевой пат в пышном зале!»`]}},"jacques-rogue":{forest:{win:[`Жак роняет монетку: «Эй! Ладно, твой меч убедительнее ловушек!»`,`Жак поднимает руки: «Забирай кошелёк, только не делай дырок в камзоле!»`,`Жак прячет кинжал: «Лесной бизнес прогорел, ухожу!»`,`Жак отступает: «Рыцарская броня сегодня слишком крепка!»`,`Жак кланяется: «Сдаюсь, ты прошёл мой лесной блокпост!»`],loss:[`Жак подбрасывает монетку: «Плата за проход успешно взыскана!»`,`Жак ухмыляется: «Лесные ловушки Жака работают идеально!»`,`Жак подмигивает: «Спасибо за дуэль, кошелёк остаётся у меня!»`,`Жак с поклоном: «Сегодня плут перехитрил рыцаря!»`,`Жак пересчитывает монеты: «Лес любит богатых и хитрых!»`],draw:[`Жак и рыцарь одновременно схватились за один кошелёк — ничья!`,`Жак: «Ничья! Монеты делить не будем, разойдёмся!»`,`Жак подбрасывает кинжал: «Равный поединок в чаще!»`,`Вы оба выдохлись на лесной тропе.`,`Жак убирает сталь: «Ничья! Мои ловушки против твоего щита!»`]},fortress:{win:[`Жак у ворот: «Проход бесплатный! Ты победил, сэр!»`,`Жак бросает кинжал: «Твой напор пробил уловки!»`,`Жак прижимается к стене: «Сдаюсь! Не сбрасывай в ров!»`,`Жак с досадой: «Крепость твоя, расценки снижены до нуля!»`,`Жак машет белым платком у старых стен.`],loss:[`Жак на башне: «Вдвое дороже за проход, и победа моя!»`,`Жак подбрасывает монету: «Стены крепости принесли куш!»`,`Жак с ухмылкой: «Уловка сработала прямо у ворот!»`,`Жак: «Твой доспех остался у подъемного моста!»`,`Жак кланяется: «Спасибо за плату у стен крепости!»`],draw:[`Жак упёрся в твой щит: «Ничья! Никто не заплатил!»`,`Оба бойца застыли у крепостного рва.`,`Жак: «Равный бой! Скидка 50% обоим!»`,`Кинжал и меч скрестились у ворот — пат!`,`Жак вытирает пот: «Разойдёмся без пошлин!»`]},citadel:{win:[`Жак на мраморе: «В цитадели ты дёрешься на миллион!»`,`Жак роняет кинжал: «Золоченые латы оказались прочнее!»`,`Жак отползает: «Слуги лорда видят твой триумф!»`,`Жак поднимает руки: «Сдаюсь пред замковыми воротами!»`,`Жак с поклоном: «Твой меч заслужил эту цитадель!»`],loss:[`Жак у ворот цитадели: «Самый богатый улов года!»`,`Жак подбрасывает кинжал: «Победа в стенах самого лорда!»`,`Жак с улыбкой: «Блестящие доспехи красиво падают на мрамор!»`,`Жак потирает руки: «Цитадель покорилась хитрости!»`,`Жак кланяется: «Победный салют от Жака!»`],draw:[`Жак и рыцарь опустили оружие в пышном зале.`,`Жак: «Ничья перед слугами лорда!»`,`Оба выдохлись на мраморных плитах.`,`Жак подбрасывает монетку: «Орёл — ничья, решка — пат!»`,`Равный бой у ворот цитадели.`]}}};function J(e,t,n){let r=q[e];if(!r||!r[t]||!r[t][n])return`Поединок завершён!`;let i=r[t][n];return i[Math.floor(Math.random()*i.length)]}var Y=[`head`,`torso`,`arms`,`groin`,`thighs`,`legs`],X=class extends g{header=null;battleField=null;battleLog=null;playerProfile=null;opponentProfile=null;playerFighter=null;opponentFighter=null;isRestored=!1;currentIntro=``;currentOutro=``;battleOutcome=null;rounds=[];constructor(){super({tagName:`div`,className:`battle-wrapper`})}onMount(){this.loadOrCreateBattle(),this.initHeader(),this.initArena(),this.initLog()}onUnmount(){this.header?.unmount(),this.battleField?.unmount(),this.battleLog?.unmount()}initHeader(){let e=this.element.querySelector(`[data-header-slot]`);e&&(this.header=new x,this.header.mount(e))}loadOrCreateBattle(){let n=f.getState(),r=t(e.BATTLE,null);r?(this.isRestored=!0,this.playerProfile=r.playerProfile,this.opponentProfile=r.opponentProfile,this.playerFighter=new W(r.playerHp),this.opponentFighter=new W(r.opponentHp),this.currentIntro=r.intro||``,this.currentOutro=r.outro||``,this.rounds=[...r.logs||[]],this.battleOutcome=r.outcome??null):(this.isRestored=!1,this.playerProfile=o(n.selectedAvatarId),this.opponentProfile=E(),this.playerFighter=new W(this.playerProfile.hp),this.opponentFighter=new W(this.opponentProfile.hp),this.currentIntro=``,this.currentOutro=``,this.battleOutcome=null,this.rounds=[])}initArena(){let e=this.element.querySelector(`[data-arena-slot]`);!e||!this.playerProfile||!this.opponentProfile||(this.battleField=new I({player:this.playerProfile,opponent:this.opponentProfile,playerName:f.getState().playerName,onAttackSubmit:this.handleTurn,onNewBattle:this.handleNewBattle}),this.battleField.mount(e),this.battleField.updateHp(`player`,this.playerFighter.getHp()),this.battleField.updateHp(`opponent`,this.opponentFighter.getHp()),this.battleOutcome&&this.battleField.showResult(this.battleOutcome))}initLog(){let e=this.element.querySelector(`[data-log-slot]`);e&&(this.battleLog=new z([...this.rounds]),this.battleLog.mount(e),this.isRestored?(this.currentIntro&&this.battleLog.addPhrase(`intro`,this.currentIntro),this.currentOutro&&this.battleLog.addPhrase(`outro`,this.currentOutro)):this.addStartPhrase())}addStartPhrase(){if(!this.opponentProfile)return;let e=f.getState().selectedThemeId,t=K(this.opponentProfile.id,e);this.currentIntro=t,this.battleLog?.addPhrase(`intro`,t)}addEndPhrase(e){if(!this.opponentProfile)return;let t=f.getState().selectedThemeId,n=J(this.opponentProfile.id,t,e);this.currentOutro=n,this.battleLog?.addPhrase(`outro`,n)}handleTurn=(e,t)=>{if(!this.canProcessTurn())return;let n=this.resolveBattleTurn(e,t);this.applyRoundResult(n);let r=this.checkBattleOutcome();if(r){this.finalizeBattle(r);return}this.saveBattleState()};canProcessTurn(){return!!(this.playerProfile&&this.opponentProfile&&this.playerFighter&&this.opponentFighter)}resolveBattleTurn(e,t){let n=U(Y,this.opponentProfile.attackZonesCount),r=U(Y,this.opponentProfile.defenseZonesCount);return V(this.createFighterInput(this.playerProfile,e,t,!0),this.createFighterInput(this.opponentProfile,n,r))}applyRoundResult(e){this.playerFighter.takeDamage(e.playerDamageTaken),this.opponentFighter.takeDamage(e.opponentDamageTaken),this.battleField?.updateHp(`player`,this.playerFighter.getHp()),this.battleField?.updateHp(`opponent`,this.opponentFighter.getHp()),this.battleLog?.addRound(e.logs),this.rounds.push(e.logs)}checkBattleOutcome(){let e=this.playerFighter.isAlive(),t=this.opponentFighter.isAlive();return!e&&!t?`draw`:e?t?null:`win`:`loss`}finalizeBattle(e){this.battleOutcome=e,this.addEndPhrase(e),this.battleField?.showResult(e),f.recordBattleResult(this.opponentProfile.name,e),this.saveBattleState(e)}handleNewBattle=()=>{r(e.BATTLE);let t=f.getState();this.playerProfile=o(t.selectedAvatarId),this.opponentProfile=E(),this.playerFighter=new W(this.playerProfile.hp),this.opponentFighter=new W(this.opponentProfile.hp),this.isRestored=!1,this.currentIntro=``,this.currentOutro=``,this.battleOutcome=null,this.rounds=[],this.battleField?.resetBattle(this.playerProfile,this.opponentProfile),this.battleField?.updateHp(`player`,this.playerFighter.getHp()),this.battleField?.updateHp(`opponent`,this.opponentFighter.getHp()),this.battleLog?.clear(),this.addStartPhrase(),this.saveBattleState()};createFighterInput(e,t,n,r=!1){return{name:r&&f.getState().playerName||e.name,attackZones:t.map(t=>({zone:t,isCritical:H(e.critChance)})),defenseZones:n,baseDamage:e.baseDamage,critMultiplier:e.critMultiplier}}saveBattleState(t){if(!this.playerProfile||!this.opponentProfile||!this.playerFighter||!this.opponentFighter)return;let r={playerProfile:this.playerProfile,opponentProfile:this.opponentProfile,playerHp:this.playerFighter.getHp(),opponentHp:this.opponentFighter.getHp(),logs:this.rounds,intro:this.currentIntro,outro:this.currentOutro,outcome:t};n(e.BATTLE,r)}render(){return`
      <div data-header-slot></div>
      <main class="page battle-page">
        <h1 class="page-title visually-hidden">Страница боя</h1>
        <div class="battle-layout">
          <div data-arena-slot></div>
          <div data-log-slot></div>
        </div>
      </main>
    `}},Z=class extends g{header=null;constructor(){super({tagName:`div`,className:`rules-wrapper`})}onMount(){this.initHeader()}onUnmount(){this.header?.unmount()}initHeader(){let e=this.element.querySelector(`[data-header-slot]`);e&&(this.header=new x,this.header.mount(e))}render(){return`
      <div data-header-slot></div>
      <main class="page rules-page">
        <section class="parchment parchment--long parchment--rules">
          <img
            class="parchment__bg"
            src="./img/parchment/Parchment-curved-long.png"
            alt=""
            aria-hidden="true" />

          <div class="parchment__seal" aria-hidden="true"></div>

          <div class="parchment__content">
            <h1 class="rules-title">Свод Правил</h1>

            <div class="rules-content-wrapper">
              <article class="rules-section">
                <h2 class="rules-section__title">1. Боевая система</h2>
                <p>
                  Каждый ход разворачивается одновременно! Выбирай
                  <strong>1 зону для атаки</strong> и
                  <strong>2 зоны для защиты</strong>. Пока зоны не выбраны — удар нанести невозможно.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">2. Расчет Урона</h2>
                <p>
                  Удар наносит урон только в том случае, если противник
                  <strong>не заблокировал</strong> эту зону. Если твоя атака и
                  защита врага совпали — урон блокируется.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">3. Профили Противников</h2>
                <p>
                  Разные враги имеют уникальные стили боя! Некоторые способны
                  атаковать 2 зоны за раз, но слабее защищаются, другие —
                  наоборот. Изучай тактику противника, чтобы предугадать его ход.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">4. Критические Удары</h2>
                <p>
                  Случайный критический удар наносит
                  <strong>x1.5 урона</strong> и
                  <span class="rules-section__highlight">пробивает любой блок</span>!
                  Даже если враг защищал эту зону, критический урон всё равно
                  достигнет цели.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">5. Справочная Информация</h2>
                <p>
                  Во время боя наведи курсор на <strong>имя бойца</strong> (игрока или противника)
                  в его карточке — появится всплывающая подсказка с полной статистикой:
                  текущее и максимальное здоровье, количество зон атаки и защиты,
                  базовый урон, шанс крита и множитель.
                </p>
              </article>
            </div>

            <a href="#/home" class="btn btn--rules-back" data-link>В главное меню</a>
          </div>
        </section>
      </main>
    `}},Q=class extends g{constructor(){super({tagName:`main`,className:`page not-found-page`})}onMount(){this.element.addEventListener(`click`,this.handleClick)}onUnmount(){this.element.removeEventListener(`click`,this.handleClick)}handleClick=e=>{e.target.closest(`[data-action="go-home"]`)&&(e.preventDefault(),h.navigate(`/home`))};render(){return`
      <div class="not-found__bg" aria-hidden="true"></div>

      <div class="not-found__content">
        <h1 class="not-found__code">ОШИБКА 404</h1>
        <p class="not-found__title">СТРАНИЦА НЕ НАЙДЕНА.</p>
        <p class="not-found__subtitle">ВАШ ПУТЬ ПРИВЕЛ В НИКУДА.</p>

        <button
          type="button"
          class="btn btn--not-found"
          data-action="go-home">
          ВЕРНУТЬСЯ НА ГЛАВНУЮ
        </button>
      </div>
    `}};h.addRoute(`/`,y),h.addRoute(`/home`,b),h.addRoute(`/character`,A),h.addRoute(`/settings`,j),h.addRoute(`/battle`,X),h.addRoute(`/rules`,Z),h.addRoute(`/404`,Q);