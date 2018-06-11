var dispStr = "";
var keys = document.getElementsByClassName("key");
var ansStr = "";
var errMess = "Error ! ! !";
function write()
{
	var val = this.innerHTML;
	if(ansStr !== "")
	{
		if(isNaN(parseFloat(val)) && val !== "." && ansStr !== errMess)
		{
			dispStr = ansStr;
			ansStr = "";
			document.getElementById("ans").innerHTML = ansStr;
		}
		else
			clear();
	}
	dispStr += val;
	document.getElementById("exp").innerHTML = dispStr;
}
function writee()
{
	if((ansStr !== "") && (ansStr !== errMess))
	{
		dispStr = this.innerHTML + "(" + ansStr;
		ansStr = "";
		document.getElementById("ans").innerHTML = ansStr;
		document.getElementById("exp").innerHTML = dispStr;	
	}	
	else if(ansStr === "")
	{
		dispStr += this.innerHTML + "(";
		document.getElementById("exp").innerHTML = dispStr;	
	}
	else
	{
		clear();
		dispStr += this.innerHTML + "(";
		document.getElementById("exp").innerHTML = dispStr;	
	}
}
function clear()
{
	dispStr = "";
	document.getElementById("exp").innerHTML = dispStr;
	ansStr = "";
	document.getElementById("ans").innerHTML = ansStr;	
}
function del()
{
	if(ansStr !== "")
	{
		ansStr = "";
		document.getElementById("ans").innerHTML = ansStr;
	}
	dispStr = dispStr.slice(0, dispStr.length-1);
	var lchar = dispStr.charAt(dispStr.length-1);
	if(lchar === "M"||lchar === "F"||lchar === "n"||lchar === "s"||lchar === "g")
		dispStr = dispStr.slice(0, dispStr.length-3);
	document.getElementById("exp").innerHTML = dispStr;
}	
function evaluate()
{
	answer = calculate(dispStr);
	if(dispStr === "")
		ansStr = "";
	else if(answer === "error" || isNaN(answer))
		ansStr += errMess;
	else
		ansStr += answer;
	document.getElementById("ans").innerHTML = ansStr;
}
function hcf(a,b)
{
	if(a%b === 0)
		return b;
	else
		return hcf(b,a%b);
}
function lcm(a,b)
{
	return (a*b)/hcf(a,b);
}
function fact(a)
{
	var f = 1, i = 1;
	while(i <= a)
	{
		f *= i;
		i++;
	}
	return f;
}
function calculate(str)
{
	var ctr, l = str.length, p, q;
	for(var i = 0; i < l; i++)
	{
		if(str.charAt(i) === "(")
			ctr--;
		else if(str.charAt(i) === ")")
			ctr++;
		if(ctr > 0)
			return "error";
	}
	if(ctr < 0)
		return "error";
	while(1)
	{
		l = str.length;
		p = str.indexOf("LCM(");
		if(p > -1)
		{
			ctr = -1;
			q = p+4;
			while((ctr !== 0)&&(q < l))
			{
				if(str.charAt(q) === "(")
					ctr--;
				else if(str.charAt(q) === ")")
					ctr++;
				q++;
			}
			var input = str.slice(p+4,q-1).split(",");
				if(input.length !== 2)
					return "error";
				else
				{
					input[0] = calculate(input[0]);
					input[1] = calculate(input[1]);
					if(input[0] === "error" || input[1] === "error")
						return "error";
					if(Number.isInteger(input[0]) && Number.isInteger(input[1]) && input[0] > 0 && input[1] > 0)
						str = str.slice(0,p) + lcm(input[0],input[1]) + str.slice(q,l);
					else
						return "error";	
				}
		}
		else
			break;
	}
	while(1)
	{
		l = str.length;
		p = str.indexOf("HCF(");
		if(p > -1)
		{
			ctr = -1;
			q = p+4;
			while((ctr !== 0)&&(q < l))
			{
				if(str.charAt(q) === "(")
					ctr--;
				else if(str.charAt(q) === ")")
					ctr++;
				q++;
			}
			var input = str.slice(p+4,q-1).split(",");
				if(input.length !== 2)
					return "error";
				else
				{
					input[0] = calculate(input[0]);
					input[1] = calculate(input[1]);
					if(input[0] === "error" || input[1] === "error")
						return "error";
					if(Number.isInteger(input[0]) && Number.isInteger(input[1]) && input[0] > 0 && input[1] > 0)
						str = str.slice(0,p) + hcf(input[0],input[1]) + str.slice(q,l);
					else
						return "error";	
				}
		}
		else
			break;
	}
	while(1)
	{
		l = str.length;
		p = str.indexOf("log(");
		if(p > -1)
		{
			ctr = -1;
			q = p+4;
			while((ctr !== 0)&&(q < l))
			{
				if(str.charAt(q) === "(")
					ctr--;
				else if(str.charAt(q) === ")")
					ctr++;
				q++;
			}
			var input = calculate(str.slice(p+4,q-1));
				if(input <= 0)
					return "error";
				else
					str = str.replace("log", "temp");
		}
		else
			break;
	}
	while(1)
	{
		l = str.length;
		var input;
		p = str.indexOf("!");
		if(p > -1)
		{
			if(str.charAt(p-1) >= '0' && str.charAt(p-1) <= '9')
			{
				ctr = -1;
				q = p-1;
				while(((str.charAt(q) >= '0' && str.charAt(q) <= '9') || str.charAt(q) === ".") && q >= 0)
					q--;
				input = parseFloat(str.slice(q+1,p));
				if(Number.isInteger(input) && input >= 0)
					str = str.slice(0,q+1)+fact(input)+str.slice(p+1,l);
				else
					return "error";
			}
			else if(str.charAt(p-1) === ")")
			{
				ctr = 1;
				q = p-2;
				while((ctr !== 0)&&(q >= 0))
				{
					if(str.charAt(q) === "(")
						ctr--;
				    else if(str.charAt(q) === ")")
					    ctr++;
				    q--;
				}
				input = calculate(str.slice(q+2,p-1));
				if(input === "error")
					return "error";
				else if(Number.isInteger(input) && input >= 0)
					str = str.slice(0,q+1)+fact(input)+str.slice(p+1,l);
				else
					return "error";
			}
		}
		else
			break;
	}
	while(1)
	{
		l = str.length;
		p = str.indexOf("pow(");
		if(p > -1)
		{
			ctr = -1;
			q = p+4;
			while((ctr !== 0)&&(q < l))
			{
				if(str.charAt(q) === "(")
					ctr--;
				else if(str.charAt(q) === ")")
					ctr++;
				q++;
			}
			var input = str.slice(p+4,q-1).split(",");
				if(input.length !== 2)
					return "error";
				else
				{
					input[0] = calculate(input[0]);
					input[1] = calculate(input[1]);
					if(input[0] === "error" || input[1] === "error")
						return "error";
					else
						str = str.replace("pow", "ppp");	
				}
		}
		else
			break;
	}
	str = str.replace(/sin/g, "Math.sin");
 	str = str.replace(/cos/g, "Math.cos");
	str = str.replace(/tan/g, "Math.tan");
	str = str.replace(/temp/g, "Math.log");
	str = str.replace(/ppp/g, "Math.pow");
	try
	{
		res = parseFloat(eval(str));
	}
	catch(err)
	{
		res = "error";
	}
	return res;
}
for(var i=0; i<20; i++)
keys[i].addEventListener("click", write);
for(var i=20; i<30; i++)
keys[i].addEventListener("click", writee);
document.getElementById("clear").removeEventListener("click", writee);
document.getElementById("clear").addEventListener("click", clear);
document.getElementById("del").removeEventListener("click", writee);
document.getElementById("del").addEventListener("click", del);
document.getElementById("eval").removeEventListener("click", writee);
document.getElementById("eval").addEventListener("click", evaluate); 
