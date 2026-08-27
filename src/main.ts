import './bootstrap';
import { router } from './core/router';
import { RegistrationScreen } from './screens/registration-screen';
import { HomeScreen } from './screens/home-screen';
import { CharacterScreen } from './screens/character-screen';
import { SettingsScreen } from './screens/settings-screen';
import { BattleScreen } from './screens/battle-screen';
import { RulesScreen } from './screens/rules-screen';
import { NotFoundScreen } from './screens/not-found-screen';

import '../css/common.css';

router.addRoute('/', RegistrationScreen);
router.addRoute('/home', HomeScreen);
router.addRoute('/character', CharacterScreen);
router.addRoute('/settings', SettingsScreen);
router.addRoute('/battle', BattleScreen);
router.addRoute('/rules', RulesScreen);
router.addRoute('/404', NotFoundScreen);
