import React, {Component} from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component{
    static defaultProps = {
        country:'in',
        pageSize:6,
        category: 'general',
    }
    static propTypes = {
        counters: PropTypes.string,
        pages: PropTypes.number,
        category: PropTypes.string
    }
    CapsFirstLetter = (string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    constructor(props) {
        super(props);
        this.state = {
            articles :[],
            loading:false,
            page :1
        }
        document.title = `${this.CapsFirstLetter(this.props.category)} - NewsFeed`;
    }

    async updateArticle(){
      const  url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0219494c3d64cb4a01502789eb74f5e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parseData = await data.json()
      this.setState({
          articles:parseData.articles,
          totalResults:parseData.totalResults,
          loading:false
        });
    }

  async componentDidMount() {
      this.updateArticle()
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0219494c3d64cb4a01502789eb74f5e&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parseData = await data.json()
    //   this.setState({
    //       articles:parseData.articles,
    //       totalResults:parseData.totalResults,
    //       loading:false});
    }

    handlePrevClick = async () => {
        this.setState({page: this.state.page - 1})
        this.updateArticle();
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0219494c3d64cb4a01502789eb74f5e”&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page-1,
        //     articles: parsedData.articles,
        //     loading:false})
    }

    handleNextClick = async () => {
        this.setState({page: this.state.page + 1})
        this.updateArticle();
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){    
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b0219494c3d64cb4a01502789eb74f5e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading: true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false})
        // }
    }

    render() {
        return (
            <div className="container my-4">
                <h2 className="text-center">NewsCast - Top <span style = {{color: 'red'}}>{this.CapsFirstLetter(this.props.category)}</span> Headlines</h2>
                {this.state.loading && <Spinner/>}
                 
                <div className="row"  >
                    {!this.state.loading && this.state.articles.map((element)=>{
                    return  <div className="col-md-4"  key= {element.url} >
                                <NewsItem 
                                  title= {element.title?element.title:" "}
                                  description={element.description?element.description:''} 
                                  imageUrl ={element.urlToImage}
                                  newsUrl={element.url}
                                  author={element.author}
                                  date={element.publishedAt}
                                  source={element.source.name}/>
                            </div>
                    })}
                </div> 
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button> 
                <button disabled = {this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>&rarr; Next</button>              
                </div>
            </div>
        )
   }
}



