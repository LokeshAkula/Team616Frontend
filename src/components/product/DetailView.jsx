import {useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getProductDetails} from '../../redux/actions/productActions.js';

import {Box,makeStyles,TableRow,Typography,Table,TableBody,TableCell} from '@material-ui/core';
import { Star } from '@material-ui/icons';

import ActionItems from './ActionItems.jsx';
import Rating from '../rating/Rating.js';
import { useContext } from 'react';
import {LoginContext} from '../../context/ContextProvider.jsx';

const useStyle=makeStyles({
    component:{
        
        background:'#fffee0',

    },
    container:{
        margin:'0 80px',
        background:'#fffee0',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:30,
        height:'100vh',
        width:'100vw'
    },
    rightContainer:{
        marginTop:50,
        '&>*':{
            marginTop:10,
        }
    },
    smallText:{
        fontSize:14,
        color:'#4054b4',
        fontWeight:'bolder',
    }
})

const DetailView=({match})=>{

    const date=new Date(new Date().getTime()+(3*24*60*60*1000));

    const classes=useStyle();

    const {product} =useSelector(state=>state.getProductDetails);

    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getProductDetails(match.params.id));
    },[dispatch, match.params]);

    const {profile,setProfile}=useContext(LoginContext);

    return(
        <Box className={classes.component}>
            {product && Object.keys(product).length &&
            <Box className={classes.container}>
                <Box style={{minWidth:'40%'}}>
                    <ActionItems product={product}></ActionItems>
                </Box>
                    
                <Box className={classes.rightContainer}>
                    <Typography style={{fontSize:25}}> {product.name} </Typography>
                    <Typography style={{fontSize:15,fontWeight:'lighter'}}>{product.type}</Typography>
                    <Typography className={classes.smallText}>{product.rating}<Star style={{fontSize:18,marginBottom:-3}}></Star> Rating</Typography>
                    <Typography style={{fontSize:20}}>Rs. {product.price}</Typography>
                    <Typography style={{fontSize:14,color:'#4054b4',fontWeight:'bold',background:'#ffffff'}}>"This Wedding season : Flat 10% off on every purchase"</Typography>

                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{color:'grey'}}>Delivery by </TableCell>
                                <TableCell>: {date.toDateString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{color:'grey'}}>In stock </TableCell>
                                <TableCell>: available</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{color:'grey'}}>Warranty </TableCell>
                                <TableCell>: No warranty</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell style={{color:'grey'}}>No return Policy</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <>{ profile ?
                    <Box>
                    <Typography style={{fontSize:17,color:'purple'}}> Rate this {product.type} : </Typography>
                    <Rating type={"product"} part={product.id}/>
                    </Box> : null
                    }</>
                </Box>
            </Box>
            }
        </Box>
    )
}

export default DetailView;