import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Subject } from 'rxjs';
import { Book, BookCategory, Order, User, UserType } from '../../models/models';

@Injectable({
  providedIn: 'root'
})
export class Api {
  baseUrl = 'https://api-lib-ashraful.runasp.net/api/Library/'; // 🔹 Use HTTP dev server
  userStatus: Subject<string> = new Subject();
  constructor(private http: HttpClient, private jwt: JwtHelperService) {}

  register(user: any) {
    return this.http.post(this.baseUrl , user, { responseType: 'text' });
  }

 login(info: any) {
    let params = new HttpParams()
      .append('email', info.email)
      .append('password', info.password);

    return this.http.get(this.baseUrl + 'Login', {
      params: params,
      responseType: 'text',
    });
  }
  isLoggedIn(): boolean{
    if(
      localStorage.getItem('access_token')!=null && !this.jwt.isTokenExpired()
    )
    return true;
    return false;
  }
  getUserInfo(): User | null {
    if (!this.isLoggedIn()) return null;
    var decodedToken = this.jwt.decodeToken();
    var user: User = {
      id: decodedToken.id,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      userType: UserType[decodedToken.userType as keyof typeof UserType],
      accountStatus: decodedToken.accountStatus,
      createdOn: decodedToken.createdOn,
      password: '',
    };
    return user;
    
  }
  logout(){
    localStorage.removeItem("access_token");
    this.userStatus.next("loggedOff");
  }
  getBooks(){
    return this.http.get<Book[]>(this.baseUrl+'GetBooks');
  }

  orderBook(book: Book){
    let userId = this.getUserInfo()!.id;
    let params = new HttpParams().append('userId',userId).append('bookId',book.id);
    return this.http.post(this.baseUrl + "OrderBook",null,{
      params: params,
      responseType: 'text',
    })
  }

  getOrdersOfUser(userId: number){
    let params =new HttpParams().append('userId',userId);
    return this.http.get<any>(this.baseUrl+'GetOrderOfUser',{
      params: params,
    }).pipe(
      map((orders)=>{
        let newOrders = orders.map((order: any)=>{
          let newOrder: Order={
            id: order.id,
            userId: order.userId,
            userName: order.user.firstName+' '+order.user.lastName,
            bookId: order.bookId,
            bookTitle: order.book.title,
            orderDate: order.orderDate,
            returned: order.returned,
            returnDate: order.returnDate,
            finePaid: order.finePaid,
          };
          return newOrder;
        });
          return newOrders;
      })
    );
  }
  getFine(order: Order){
    let today = new Date();
    let orderDate = new Date(Date.parse(order.orderDate));
    orderDate.setDate(orderDate.getDate()+10);
    if(orderDate.getTime()<today.getTime()){
      var diff = today.getTime()-orderDate.getTime();
      let day = Math.floor(diff/(1000*86400));
      return day *50;
    }
    return 0;
  }

  addNewCategory(category: BookCategory){
    return this.http.post(this.baseUrl+"AddCategory",category,{
      responseType: "text",
    })
  }

  GetCategories(){
    return this.http.get<BookCategory[]>(this.baseUrl+ 'GetCategories');
  }

  addBook(book: Book){
    return this.http.post(this.baseUrl+'AddBook',book,{
      responseType:'text',
    });
  }
  deleteBook(id:number){
    return this.http.delete(this.baseUrl + 'DeleteBook',{
      params: new HttpParams().append('id', id),
      responseType: 'text',
    });
  }

  returnBook(userId: string, bookId: string, fine: number){
    return this.http.get(this.baseUrl +'ReturnBook',{
      params: new HttpParams().append('userId', userId).append('bookId',bookId).append('fine',fine),
      responseType: 'text',
    });
  }

  getUsers(){
    return this.http.get<User[]>(this.baseUrl+ 'GetUsers');
  }
  approveRequest(userId :number){
    return this.http.get(this.baseUrl+'ApproveRequest',{
      params:new HttpParams().append('userId',userId),
      responseType: 'text',
    });
  }

  getOrders(){
    return this.http.get<any>(this.baseUrl+'GetOrders').pipe(
      map((orders)=>{
        let newOrders = orders.map((order: any)=>{
          let newOrder: Order={
            id: order.id,
            userId: order.userId,
            userName: order.user.firstName+' '+order.user.lastName,
            bookId: order.bookId,
            bookTitle: order.book.title,
            orderDate: order.orderDate,
            returned: order.returned,
            returnDate: order.returnDate,
            finePaid: order.finePaid,
          };
          return newOrder;
        });
          return newOrders;
      })
    );
  }

  sendEmail(){
    return this.http.get(this.baseUrl+ "SendEmailForPendingReturns",{
      responseType: "text",
    })
  }

  blockUsers(){
    return this.http.get(this.baseUrl + 'BlockFineOverdueUser',{
      responseType:'text',
    })
  }

  unblock(userId: number){
    return this.http.get(this.baseUrl+"Unblock",{
      params: new HttpParams().append("userId",userId),
      responseType: "text",
    })
  }

}

