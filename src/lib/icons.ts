import arrowOutward from '@material-design-icons/svg/outlined/arrow_outward.svg?raw';
import playArrow from '@material-design-icons/svg/outlined/play_arrow.svg?raw';
import spatialAudio from '@material-design-icons/svg/outlined/spatial_audio.svg?raw';
import graphicEq from '@material-design-icons/svg/outlined/graphic_eq.svg?raw';
import sensors from '@material-design-icons/svg/outlined/sensors.svg?raw';
import bolt from '@material-design-icons/svg/outlined/bolt.svg?raw';
import menu from '@material-design-icons/svg/outlined/menu.svg?raw';
import close from '@material-design-icons/svg/outlined/close.svg?raw';
import check from '@material-design-icons/svg/outlined/check.svg?raw';
import add from '@material-design-icons/svg/outlined/add.svg?raw';
import tune from '@material-design-icons/svg/outlined/tune.svg?raw';
import movie from '@material-design-icons/svg/outlined/movie.svg?raw';
import forest from '@material-design-icons/svg/outlined/forest.svg?raw';
import mail from '@material-design-icons/svg/outlined/mail.svg?raw';
import publicIcon from '@material-design-icons/svg/outlined/public.svg?raw';
import arrowDownward from '@material-design-icons/svg/outlined/arrow_downward.svg?raw';
import north from '@material-design-icons/svg/outlined/north.svg?raw';
import autoAwesome from '@material-design-icons/svg/outlined/auto_awesome.svg?raw';
import waves from '@material-design-icons/svg/outlined/waves.svg?raw';
import radar from '@material-design-icons/svg/outlined/radar.svg?raw';
import album from '@material-design-icons/svg/outlined/album.svg?raw';
import air from '@material-design-icons/svg/outlined/air.svg?raw';
import science from '@material-design-icons/svg/outlined/science.svg?raw';
import batteryFull from '@material-design-icons/svg/outlined/battery_full.svg?raw';
import straighten from '@material-design-icons/svg/outlined/straighten.svg?raw';

export const icons = {
  arrowOutward,
  playArrow,
  spatialAudio,
  graphicEq,
  sensors,
  bolt,
  menu,
  close,
  check,
  add,
  tune,
  movie,
  forest,
  mail,
  public: publicIcon,
  arrowDownward,
  north,
  autoAwesome,
  waves,
  radar,
  album,
  air,
  science,
  batteryFull,
  straighten,
} as const;

export type IconName = keyof typeof icons;
