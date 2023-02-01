import {NgModule} from '@angular/core';

import {FeatherModule} from 'angular-feather';
import {
  Award,
  Bell,
  Briefcase,
  Calendar,
  Camera,
  Compass,
  Edit,
  Edit2,
  Github,
  Globe,
  Heart,
  Inbox,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Search,
  Send,
  Shield,
  Smile,
  Trash2,
  User,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  UserX
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Camera,
  Heart,
  Github,
  Plus,
  Bell,
  User,
  Inbox,
  Mail,
  Phone,
  Calendar,
  Award,
  Shield,
  Briefcase,
  Users,
  UserMinus,
  UserPlus,
  UserCheck,
  UserX,
  Save,
  Edit,
  RotateCcw,
  Trash2,
  Edit2,
  Search,
  MapPin,
  Compass,
  Globe,
  Smile,
  Send,
  MoreVertical
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule {
}
