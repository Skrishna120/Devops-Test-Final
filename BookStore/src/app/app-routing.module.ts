import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'productinfo/:id',
    loadComponent: () =>
      import('./productinfo/productinfo.component').then(
        (m) => m.ProductinfoComponent
      ),
  },
  {
    path: 'premium',
    loadComponent: () =>
      import('./premium/premium.component').then((m) => m.PremiumComponent),
  },
  {
    path: 'spinner',
    loadComponent: () =>
      import('./spinner/spinner.component').then((m) => m.SpinnerComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'thanks',
    loadComponent: () =>
      import('./thanks/thanks.component').then((m) => m.ThanksComponent),
  },
  {
    path: 'userprofile/:username',
    loadComponent: () =>
      import('./userprofile/userprofile.component').then(
        (m) => m.UserprofileComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'useraccount/:username',
    loadComponent: () =>
      import('./useraccount/useraccount.component').then(
        (m) => m.UseraccountComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./wishlist/wishlist.component').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./orders/orders.component').then((m) => m.OrdersComponent),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./cart/cart.component').then((m) => m.CartComponent), // Lazy-load a module if `cart` has nested routes
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'store',
        loadComponent: () =>
          import('./store/store.component').then((m) => m.StoreComponent),
      },
      { path: '**', redirectTo: 'pagenotfound' },
    ],
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./account/account.component').then((m) => m.AccountComponent),
  },
  {
    path: 'store/:id',
    loadComponent: () =>
      import('./store/store.component').then((m) => m.StoreComponent),
  },
  {
    path: 'adminaccount/:username',
    loadComponent: () =>
      import('./adminaccount/adminaccount.component').then(
        (m) => m.AdminaccountComponent
      ),
    children: [
      { path: '', redirectTo: 'account', pathMatch: 'full' },
      {
        path: 'adminprofile',
        loadComponent: () =>
          import('./adminprofile/adminprofile.component').then(
            (m) => m.AdminprofileComponent
          ),
      },
      {
        path: 'salesinfo',
        loadComponent: () =>
          import('./salesinfo/salesinfo.component').then(
            (m) => m.SalesinfoComponent
          ),
      },
      {
        path: 'addnew',
        loadComponent: () =>
          import('./addnew/addnew.component').then((m) => m.AddnewComponent),
      },
      {
        path: 'update',
        loadComponent: () =>
          import('./update/update.component').then((m) => m.UpdateComponent),
      },
      { path: '**', redirectTo: 'pagenotfound' },
    ],
  },
  {
    path: 'admindash/:username',
    loadComponent: () =>
      import('./admindash/admindash.component').then(
        (m) => m.AdmindashComponent
      ),
    children: [
      {
        path: 'adminprofile',
        loadComponent: () =>
          import('./adminprofile/adminprofile.component').then(
            (m) => m.AdminprofileComponent
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'salesinfo',
        loadComponent: () =>
          import('./salesinfo/salesinfo.component').then(
            (m) => m.SalesinfoComponent
          ),
      },
      {
        path: 'addnew',
        loadComponent: () =>
          import('./addnew/addnew.component').then((m) => m.AddnewComponent),
      },
      {
        path: 'store',
        loadComponent: () =>
          import('./store/store.component').then((m) => m.StoreComponent),
      },
      { path: '**', redirectTo: 'pagenotfound' },
    ],
  },
  {
    path: 'error',
    loadComponent: () =>
      import('./pagenotfound/pagenotfound.component').then(
        (m) => m.PagenotfoundComponent
      ),
  },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
