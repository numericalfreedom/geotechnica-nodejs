function karp( x )
 {

  const c_0_0 = 0;

  const c_cc  = 0;
  const c_ap  = 1;
  const c_bt  = 2;
  const c_dt  = 3;
  const c_ph  = 4;

  const r_kgh = 0;
  const r_kph = 1;
  const r_kch = 2;

  const r_kgv = 3;
  const r_kpv = 4;
  const r_kcv = 5;

  const r_tag = 6;
  const r_tpg = 7;

  var cc    = x[0][c_cc];
  var aprad = Radians( x[0][c_ap] );
  var btrad = Radians( x[0][c_bt] );
  var dtrad = Radians( x[0][c_dt] );
  var phrad = Radians( x[0][c_ph] ); if( phrad < c_0_0 )  phrad = c_0_0;

  var sph   = Math.sin( phrad );
  var sph2  = ( sph * sph );

  var cap   = Math.cos( aprad );
  var capbt = Math.cos( aprad - btrad );

  var tap   = Math.tan( aprad );
  var tap1  = 0;

  var sbt   = Math.sin( btrad );
  var sbt2  = ( sbt * sbt );

  var cbt   = Math.cos( btrad );
  var cbt2  = ( cbt * cbt );

  var tbt   = Math.tan( btrad );
  var tbt2  = ( tbt * tbt );

  var cph   = Math.cos( phrad );
  var cph2  = ( cph * cph );

  var tph   = Math.tan( phrad );

  var tdt   = Math.tan( dtrad );
  var tapdt = Math.tan( aprad + dtrad );
  var sapdt = Math.sin( aprad + dtrad );
  var capdt = Math.cos( aprad + dtrad );
  
  var kg    = 0;
  var kp    = 0;
  var kc    = 0;
  var ig    = 0;
  var ip    = 0;
  var ic    = 0;
  var gg    = 0;
  var gp    = 0;
  var gc    = 0;
  var tg    = 0;
  var tp    = 0;
  var tc    = 0;
       
  var kgh   = 0;
  var kph   = 0;
  var kch   = 0;

  var kgv   = 0;
  var kpv   = 0;
  var kcv   = 0;

  var tag   = 0;
  var tpg   = 0;

  switch( cc )
   {

    case 0: // Earth pressure at rest - simplified model
     kph = ( ((1 - sph) + ((cph + sph - 1) * (btrad / phrad))) );
     kgh = ( kph * cbt );
     kch = 0;
     break;

    case 1: // Earth pressure at rest - rigorous model
     kgh  = ( ((sph - sph2) / (sph - sbt2)) * cbt2 );
     tap1 = Math.sqrt( kgh / (1 + (kgh * tbt2)) );
     kgh  = ( kgh * (1 - Math.abs( tap * tbt )) * ((1 + (tap1 * tbt)) / (1 + (tap1 * tdt))) );
     kph  = ( (cap * cbt * kgh) / capbt );
     kch  = 0;
     break;

    case 2: // Active earth pressure RANKINE
     kph = Math.sqrt( cbt2 - cph2 );
     kph = ( ((cbt - kph) / (cbt + kph)) * cbt );
     kgh = ( kph * cbt );
     if( Math.abs( btrad ) > 0 )  kch = 0;  else  kch = (- 2 * Math.sqrt( kgh ) );
     tag = Degrees( (Math.PI / 4) + (phrad / 2) );
     break;

    case 3: // Passive earth pressure RANKINE
     kph = Math.sqrt( cbt2 - cph2 );
     kph = ( ((cbt + kph) / (cbt - kph)) * cbt );
     kgh = ( kph * cbt );
     if( Math.abs( btrad ) > 0 )  kch = 0;  else  kch = ( 2 * Math.sqrt( kgh ) );
     tpg = Degrees( (Math.PI / 4) - (phrad / 2) );
     break;

    case 4: // Active earth pressure COULOMB
     kgh  = ( (Math.sin( phrad + dtrad ) * Math.sin( phrad - btrad )) / (Math.cos( aprad - btrad ) * Math.cos( aprad + dtrad )) );
     kgh  = ( Math.cos( phrad - aprad ) / (Math.cos( aprad ) * (1 + Math.sqrt( kgh ))) );
     kgh *= kgh;
     kph  = ( (Math.cos( aprad ) * Math.cos( btrad ) * kgh) / Math.cos( aprad - btrad ) );
     kch  = ( (1 + Math.sin( phrad + aprad + dtrad - btrad )) * Math.cos( aprad ) );
     kch  = (- (2 * Math.cos( aprad - btrad ) * Math.cos( phrad ) * Math.cos( aprad + dtrad )) / kch );
     tag  = Math.sqrt( (Math.sin( phrad + dtrad ) * Math.cos( aprad - btrad )) / (Math.sin( phrad - btrad ) * Math.cos( aprad + dtrad )) );
     tag  = Math.atan2( Math.cos( phrad - aprad ) , (tag + Math.sin( phrad - aprad )) );
     tag  = Degrees( tag + phrad )
     break;

    case 5: // Passive earth pressure COULOMB
     kgh = ( (Math.sin( phrad - dtrad ) * Math.sin( phrad + btrad )) / (Math.cos( aprad - btrad ) * Math.cos( aprad + dtrad )) );
     kgh = ( Math.cos( phrad + aprad ) / (Math.cos( aprad ) * (1 - Math.sqrt( kgh ))) );
     kgh *= kgh;
     kph = ( (Math.cos( aprad ) * Math.cos( btrad ) * kgh) / Math.cos( aprad - btrad ) );
     kch = ( (1 - Math.sin( phrad - aprad - dtrad + btrad )) * Math.cos( aprad ) );
     kch = ( (2 * Math.cos( aprad - btrad ) * Math.cos( phrad ) * Math.cos( aprad + dtrad )) / kch );
     tpg = Math.sqrt( (Math.sin( phrad - dtrad ) * Math.cos( aprad - btrad )) / (Math.sin( phrad + btrad ) * Math.cos( aprad + dtrad )) );
     tpg = Math.atan2( Math.cos( phrad + aprad ) , (tpg - Math.sin( phrad + aprad )) );
     tpg = Degrees( tpg - phrad );
     break;
     
    case 6: // Passive earth pressure SOKOLOVSKI/PREGL
     if( phrad > 0.0 )
      {
       kg = ( (1.0 + sph) / (1.0 - sph) );
       kp = kg;
       kc = ( (kp - 1.0) / tph );
       if( dtrad <= 0.0 )
        {
         ig = Math.pow( (1.0 - (0.53 * dtrad)) , (0.26 + (5.96 * phrad)) );
         ip = Math.pow( (1.0 - (1.33 * dtrad)) , (0.08 + (2.37 * phrad)) );
         ic = ip;
        } // end if() +
       else
        {
         ig = Math.pow( (1.0 + (0.41 * dtrad)) , (- 7.13) );
         ip = Math.pow( (1.0 - (0.72 * dtrad)) , (2.81) );
         ic = Math.pow( (1.0 + (4.46 * dtrad * tph)) , ((- 1.14) + (0.57 * phrad)) );
        }; // end else    
       if( btrad <= 0.0 )
        {
         gg = Math.pow( (1.0 + (0.73 * btrad)) , (2.89) );
         gp = Math.pow( (1.0 + (1.16 * btrad)) , (1.57) );
         gc = Math.pow( (1.0 + (0.001 * btrad * phrad)) , (205.4 + (2232 * phrad)) );
        } // end if() +
       else
        {
         gg = Math.pow( (1.0 + (0.35 * btrad)) , (0.42 + (8.15 * phrad)) );
         gp = Math.pow( (1.0 + (3.84 * btrad)) , (0.98 * phrad) );
         gc = Math.exp( 2.0 * btrad * tph );
        }; // end else
       if( aprad <= 0.0 )
        {
         tg = Math.pow( (1.0 + (0.72 * aprad * tph)) , ((- 3.51) + (1.03 * phrad)) );
         tp = ( Math.exp(- 2.0 * aprad * tph ) / cap );
         tc = tp
        } // end if() +  
       else
        {
         tg = Math.pow( (1.0 - (0.0012 * aprad * tph)) , (2910 - (1958 * phrad)) );
         tp = ( Math.exp(- 2.0 * aprad * tph ) / cap );
         tc = tp
        }; // end else
      } // end if() +
     else
      {
       kg = 1.0;
       kp = 1.0;
       kc = 2.0;
       ig = 1.0;
       ip = 1.0;
       ic = 1.0;
       gg = 1.0;
       gp = 1.0;
       gc = ( 1.0 + btrad );
       tg = 1.0;
       tp = 1.0;
       tc = ( (1.0 - aprad) / cap );
      }; // end else
     kg  *= ( ig * gg * tg );
     kp  *= ( ip * gp * tp );
     kc  *= ( ic * gc * tc );  
     kgh  = ( kg * capdt );
     kph  = ( kp * capdt ); 
     kch  = ( kc * capdt );
     kgv  = ( kg * sapdt );
     kpv  = ( kp * sapdt ); 
     kcv  = ( kc * sapdt );
     tpg  = ( (Math.PI / 4.0) - (phrad / 2.0) );
     break;
     
    default:
     kgh = kph = kch = 0;

   }; // end switch( cc )

  kgv = ( kgh * tapdt );
  kpv = ( kph * tapdt );
  kcv = ( kch * tapdt );

  return( [ [ kgh , kph , kch , kgv , kpv , kcv , tag , tpg ] ] );

 }


function ztn( x , y , kghn , svg )
 {

  const c_c   = 0;
  const c_p   = 1;
  const c_gm  = 2;

  const c_kgh = 0;
  const c_kph = 1;
  const c_kch = 2;

  var   c     = x[0][c_c];
  var   p     = x[0][c_p];
  var   gm    = x[0][c_gm];

  var   kgh   = y[0][c_kgh];
  var   kph   = y[0][c_kph];
  var   kch   = y[0][c_kch];

  if( ! svg )  var svg = 0;
    
  return( [ (- ((kgh * svg) + (p * kph) + (c * kch)) / (kgh * gm) ) , (- (((kgh - kghn) * svg) + (p * kph) + (c * kch)) / ((kgh - kghn) * gm) ) ] );

 } // ztn() : Tensile crack depth and minimum earth pressure depth


function fps( ap , bt , th )
 {
   
  var aprad = Radians( ap );
  var btrad = Radians( bt );
  var thrad = Radians( th );

  return( (Math.sin( thrad - btrad ) / Math.cos( thrad - aprad )) * Math.cos( aprad ) );

 } // fps() : depth factor of spread surface load in COULOMB earth pressure problem


function fhs( apt , apb , bt )
 {
   
  var aptrad = Radians( apt );
  var apbrad = Radians( apb );
  var btrad  = Radians( bt  );

  return( (Math.sin( aptrad - apbrad ) * Math.sin( btrad )) / (Math.cos( apbrad - btrad ) * Math.cos( aptrad )) );

 } // fhb() : height factor due to different wall surface inclination in COULOMB earth pressure problem
