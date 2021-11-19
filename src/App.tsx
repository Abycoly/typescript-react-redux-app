import React, { Component } from "react";
import { Container, Grid, Snackbar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { StyledButtonTrue, StyledButtonFalse } from "./style";
import { connect } from "react-redux";
// import { AnyAction } from "redux";
// import { IStore } from "./reducers";
import { getQuizListItem, giveAnswer, restart } from "./actions/quiz";
import { IQuizListItem } from "./models";
import { IStore } from "./reducers";
import { getCurrentQuizListItem } from "./selectors/quiz";

interface OwnProps {

}
interface StateProps {
  currentQuizItem?: IQuizListItem;
  currentQuizItemIndex: number;
  quizListLength: number;
  scrore: number;
}
interface DispatchProps {
  getQuizListItem: typeof getQuizListItem;
  giveAnswer: typeof giveAnswer;
  restart: typeof restart;
}

interface LocalStateProps{
  message : string;
  isOpen : boolean;
  className : "good" | "wrong"
}

type Props = OwnProps & StateProps & DispatchProps;

export class App extends Component<Props, LocalStateProps> {

  state: LocalStateProps = { message: "", isOpen: false, className:"good"}
  componentDidMount() {
    this.props.getQuizListItem(10, "easy");
  }
  private renderHeader = () => {
    return (<Grid container direction="row" justify="space-between" alignItems="flex-start">
      <Box mt={10} fontWeight="fontWeightBold" fontSize={40} >
        <div style={{ color: "#e55fff" }}>Easy</div>
        <div style={{ color: "#2858fb" }} >Quizy</div>
      </Box>
      <Box mt={10} style={{ color: "#2858fb" }} fontSize={20} className="txt"> Score : {this.props.scrore} / {this.props.quizListLength}</Box>
    </Grid>)
  }

  private renderQuestionInfo = () => {
    const { quizListLength, currentQuizItemIndex, currentQuizItem } = this.props
    return (<Grid container direction="column" alignItems="center" justify="center" style={{ minHeight: '40vh' }}>
      <div className="txt question_number" style={{ color: "#33cf6f" }}>Question N° {currentQuizItemIndex + 1} / {quizListLength} </div>
      <div className="txt question_number"> Category {currentQuizItem!.category} </div>
      <div className="txt" dangerouslySetInnerHTML={{ __html: currentQuizItem!.question }} />
    </Grid>)
  }
  private answerQestion = (answer: "True" | "False") => () => {
    const isCorrectAnswer = this.props.currentQuizItem?.correct_answer === answer
    this.props.giveAnswer(isCorrectAnswer, this.props.currentQuizItemIndex === this.props.quizListLength - 1)
    this.setState({ message: isCorrectAnswer ? "Well done !" : "Nope.", className: isCorrectAnswer ? "good" : "wrong", isOpen: true})
  }
  private renderButton = () => {
    if (this.props.currentQuizItemIndex < this.props.quizListLength - 1) {
      return (
        <Grid container direction="row" alignItems="center" justify="space-evenly" >
          <StyledButtonTrue onClick={this.answerQestion("True")} >TRUE</StyledButtonTrue>
          <StyledButtonFalse onClick={this.answerQestion("False")} >FALSE</StyledButtonFalse>
        </Grid>
      )
    } else {
      return (
        <Grid container direction="column" alignItems="center" justify="center" >
          <Box mt={10} fontSize={20} style={{ marginBottom: "2rem" }} className="txt">Final Score : {this.props.scrore} / {this.props.quizListLength}</Box>
          <StyledButtonTrue onClick={this.props.restart} >Restart</StyledButtonTrue>
        </Grid>
      )
    }
  }
  private onSnackBarClose=()=>{
    this.setState({isOpen: false})
  }
  private renderContent = () => {
    return (
      <div>
        {this.renderHeader()}
        {this.props.currentQuizItem && this.props.currentQuizItemIndex < this.props.quizListLength - 1 && this.renderQuestionInfo()}
        {this.renderButton()}
        <Snackbar anchorOrigin={{ vertical:"bottom", horizontal:"center"}}
                  autoHideDuration={400}
                  open={this.state.isOpen}
                  onClose={this.onSnackBarClose}
                  message={this.state.message}
                  className={this.state.className}
        />
      </div>
    )
  }
  render() {
    return (
      <Container fixed={true} className="cont">
        {this.props.currentQuizItem ? this.renderContent() : ''}
      </Container >
    );
  }
}

const mapStateToProps = (state: any): StateProps => {
  const s = state as IStore
  return {
    currentQuizItem: getCurrentQuizListItem(s),
    currentQuizItemIndex: s.quiz.currentQuizItemIndex,
    quizListLength: s.quiz.quizListItem.length,
    scrore: s.quiz.score
  }
}


const mapDispatchToProps: any = {
  getQuizListItem,
  giveAnswer,
  restart
}

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(App)


