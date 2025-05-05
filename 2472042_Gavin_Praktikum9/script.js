function startQuiz()
{
    var score = 0;

    for(let i = 0; i < 6; i++)
    {
        let n1 = Math.floor(Math.random() * 20) + 1;;
        let n2 = Math.floor(Math.random() * 20) + 1;;
        let operatorN = Math.floor(Math.random() * 3) + 1;;

        let correctAnswer = 0
        let operator = ""

        if (operatorN == 1)
        {
            correctAnswer = n1 + n2
            operator = " + "
        }
        else if (operatorN == 2)
        {
            correctAnswer = n1 - n2
            operator = " - "
        }
        else
        {
            correctAnswer = n1 * n2
            operator = " * "
        }

        let answer = prompt("What is " + n1 + operator + n2 + "?");

        if (parseInt(answer) == correctAnswer)
        {
            alert("Correct!");
            score++;
        }
        else if (answer == "exit")
        {
            break;
        }

        else if (answer == null)
        {
            break;
        }

        else
        {
            alert("Incorrect. The correct answer is " + correctAnswer)
        }
    }

    let answer = confirm("You got " + score + " out of 6 correct. Show results on page?")

    if (answer == true)
    {
        let finalScore = document.getElementById("finalScore");
        finalScore.style.display = "block";
        finalScore.innerHTML = "Final Score: " + score.toString() + "/6";

        
        let finishDate = document.getElementById("finishDate");

        let d = new Date().toLocaleString();

        console.log(d);

        finishDate.style.display = "block";
        finishDate.innerHTML = "Finished at " + d;
    }
}