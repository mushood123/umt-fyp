/* eslint-disable no-console */
import { SvgAc, SvgDrainage, SvgElectrician, SvgPlumbering } from '../../../assets';
import { CLAUSES, WORDS } from '../../../constants';
import { firebase } from '../../../firebase';

export const serviceCards = [
   {
      id: 1,
      icon: SvgAc,
      title: CLAUSES.HEATING_AND_COOLING_SYSTEM,
      description: 'HVAC repairs, maintenance, and installation services',
      navigateTo: 'Package Details',
      navigateParams: {
         request: 1,
         icon: SvgAc,
      },
   },
   {
      id: 2,
      icon: SvgElectrician,
      title: WORDS.ELECTRICAL,
      description: 'Wiring, fixtures, panel repairs and electrical troubleshooting',
      navigateTo: 'Package Details',
      navigateParams: {
         request: 2,
         icon: SvgElectrician,
      },
   },
   {
      id: 3,
      icon: SvgPlumbering,
      title: WORDS.PLUMBERING,
      description: 'Leak repairs, fixture installation and pipe maintenance',
      navigateTo: 'Package Details',
      navigateParams: {
         request: 3,
         icon: SvgPlumbering,
      },
   },
   {
      id: 4,
      icon: SvgDrainage,
      title: WORDS.DRAINAGE,
      description: 'Clogged drains, sewer issues and drainage system repairs',
      navigateTo: 'Package Details',
      navigateParams: {
         request: 4,
         icon: SvgDrainage,
      },
   },
];
