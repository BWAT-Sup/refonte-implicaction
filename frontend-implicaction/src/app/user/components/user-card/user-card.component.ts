import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {User} from '../../../shared/models/user';
import {Constants} from '../../../config/constants';
import {Univers} from '../../../shared/enums/univers';
import {
  BaseWithPaginationAndFilterComponent
} from "../../../shared/components/base-with-pagination-and-filter/base-with-pagination-and-filter.component";
import {Criteria} from "../../../shared/models/Criteria";
import {RelationType} from "../../models/relation-type.enum";
import {AuthService} from "../../../shared/services/auth.service";
import {UserService} from "../../services/user.service";
import {ToasterService} from "../../../core/services/toaster.service";
import {RelationService} from "../../services/relation.service";
import {ActivatedRoute, Router} from "@angular/router";

enum UserListType {
  ALL_USERS = '/users/list',
  FRIENDS = '/users/friends',
  FRIENDS_RECEIVED = '/users/friends/received',
  FRIENDS_SENT = '/users/friends/sent'
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent extends BaseWithPaginationAndFilterComponent<User, Criteria> implements OnInit {

  readonly constant = Constants;
  readonly univer = Univers;

  @Input()
  user: User;

  @Input()
  innerTemplate: TemplateRef<any>;
  currentUser: User;
  action: string;
  listType: UserListType;
  relationType = RelationType;
  isLoading = true;
  univers = Univers;
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToasterService,
    private relationService: RelationService,
    private router: Router,
    protected route: ActivatedRoute
  ) {
    super(route);
    // on détermine le type de données à afficher en fonction de l'url
    switch (router.url) {
      case UserListType.FRIENDS:
        this.listType = UserListType.FRIENDS;
        break;
      case UserListType.FRIENDS_RECEIVED:
        this.listType = UserListType.FRIENDS_RECEIVED;
        break;
      case UserListType.FRIENDS_SENT:
        this.listType = UserListType.FRIENDS_SENT;
        break;
      default:
        this.listType = UserListType.ALL_USERS;
    }
  }

  private static isFriend = (user: User): boolean => user.relationTypeOfCurrentUser === RelationType.FRIEND;

  private static isSender = (user: User): boolean => user.relationTypeOfCurrentUser === RelationType.SENDER;

  private static isReceiver = (user: User): boolean => user.relationTypeOfCurrentUser === RelationType.RECEIVER;

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    // chargement des données
    this.paginate();
  }

  /**
   * permet de refuser, annuler une demande d'ami ou de supprimer un ami
   */
  removeUserRelation(user: User): void {
    let message = '';
    this.userService
      .removeUserFromFriends(user.id)
      .subscribe(
        () => {
          if (UserCardComponent.isFriend(user)) {
            message = `L'utilisateur ${user.firstname} a bien été supprimé de vos amis`;
          } else if (UserCardComponent.isSender(user)) {
            message = `Vous avez annulé la demande d'ami avec ${user.firstname}`;
          } else if (UserCardComponent.isReceiver(user)) {
            message = `Vous avez refusé la demande d'ami de ${user.firstname}`;
          }
          user.relationTypeOfCurrentUser = RelationType.NONE;
          // il faut relancer la pagination dans le cas de l'affichage des amis / demandes
          if (this.listType !== UserListType.ALL_USERS) {
            this.paginate();
          }
        },
        () => this.toastService.error('Erreur', 'Une erreur est survenue'),
        () => this.toastService.success('Succès', message)
      );
  }


}
