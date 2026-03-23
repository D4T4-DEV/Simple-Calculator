import React, { useMemo, useState } from "react";
import {
  Percent,
  Delete,
  Divide,
  X,
  Minus,
  Plus,
  Equal,
  Menu,
  Calculator,
} from "lucide-react";
import CalcButton from "./CalcButton";
import { ActionsCalculator } from "../logic/ActionsCalculator";

const WindowsCalculator: React.FC = () => {
  const calculator = useMemo(() => new ActionsCalculator(), []);

  const [currentValue, setCurrentValue] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNumber = (num: string) => {
    setError(null);
    if (waitingForOperand) {
      setCurrentValue(num);
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === "0" ? num : currentValue + num);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      try {
        const result = executeOperation(previousValue, inputValue, operator);
        setCurrentValue(String(result));
        setPreviousValue(result);
      } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        return;
      }
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  // Funcionalidades basicas de la clase
  const executeOperation = (n1: number, n2: number, op: string): number => {
    switch (op) {
      case "+":
        return calculator.sumar(n1, n2);
      case "-":
        return calculator.restar(n1, n2);
      case "*":
        return calculator.multiplicar(n1, n2);
      case "/":
        return calculator.dividir(n1, n2);
      case "^":
        return calculator.exponente(n1, n2);
      default:
        return n2;
    }
  };

  const handleEqual = () => {
    if (!operator || previousValue === null) return;
    try {
      const result = executeOperation(
        previousValue,
        parseFloat(currentValue),
        operator,
      );
      setCurrentValue(String(result));
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      setCurrentValue("Error");
    }
  };

  // Operaciones inmediatas provenientes de la clase
  const handleInstantAction = (type: "sqrt" | "percent" | "recip" | "sqr") => {
    try {
      const val = parseFloat(currentValue);
      let res = val;
      if (type === "sqrt") res = calculator.raizCuadrada(val);
      if (type === "percent") res = calculator.porcentajeSimple(val);
      if (type === "sqr") res = calculator.exponente(val, 2);
      if (type === "recip") res = calculator.dividir(1, val);

      setCurrentValue(String(res));
      setWaitingForOperand(true);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
    }
  };

  return (
    <div className="w-full max-w-[320px] min-w-[300px] flex flex-col p-2 bg-[#1f1f1f] rounded-lg shadow-2xl font-sans text-white select-none">
      {/* Cabecera */}
      <div className="flex items-center justify-between px-2 py-1 text-[10px] text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-sky-600 rounded-sm">
            <Calculator size={12} fill="white" />
          </div>
          <span>Calculadora</span>
        </div>
      </div>

      <div className="flex items-center gap-1 mt-2 px-1">
        <button disabled={true} className="p-2 hover:bg-zinc-800 rounded-md">
          <Menu size={18} />
        </button>
        <h1 className="text-xl font-semibold ml-1">Estándar</h1>
      </div>

      {/* Pantalla */}
      <div className="w-full mt-4 mb-2 px-4 py-6 text-right">
        <div className="text-orange-400 text-[10px] uppercase font-bold h-4">
          {error && error}
        </div>
        <div className="text-zinc-400 text-xs h-5">
          {previousValue !== null && `${previousValue} ${operator || ""}`}
        </div>
        <div className="text-5xl font-semibold truncate">{currentValue}</div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-4 gap-[2px]">
        <CalcButton
          variant="action"
          onClick={() => handleInstantAction("percent")}
          className="bg-[#323232]"
        >
          <Percent size={16} />
        </CalcButton>
        <CalcButton
          variant="action"
          onClick={() => setCurrentValue("0")}
          className="bg-[#323232]"
        >
          CE
        </CalcButton>
        <CalcButton
          variant="action"
          onClick={() => {
            setCurrentValue("0");
            setPreviousValue(null);
            setOperator(null);
          }}
          className="bg-[#323232]"
        >
          C
        </CalcButton>
        <CalcButton
          variant="action"
          onClick={() =>
            setCurrentValue((prev) =>
              prev.length > 1 ? prev.slice(0, -1) : "0",
            )
          }
          className="bg-[#323232]"
        >
          <Delete size={18} />
        </CalcButton>

        <CalcButton
          variant="action"
          onClick={() => handleInstantAction("recip")}
          className="bg-[#323232] italic text-sm"
        >
          1/x
        </CalcButton>
        <CalcButton
          variant="action"
          onClick={() => handleInstantAction("sqr")}
          className="bg-[#323232] text-sm"
        >
          x²
        </CalcButton>
        <CalcButton
          variant="action"
          onClick={() => handleInstantAction("sqrt")}
          className="bg-[#323232] text-sm"
        >
          ²√x
        </CalcButton>
        <CalcButton
          variant="operator"
          onClick={() => handleOperator("/")}
          className="bg-[#323232]"
        >
          <Divide size={20} />
        </CalcButton>

        {[7, 8, 9].map((n) => (
          <CalcButton
            key={n}
            variant="number"
            onClick={() => handleNumber(n.toString())}
            className="bg-[#3b3b3b]"
          >
            {n}
          </CalcButton>
        ))}
        <CalcButton
          variant="operator"
          onClick={() => handleOperator("*")}
          className="bg-[#323232]"
        >
          <X size={18} />
        </CalcButton>

        {[4, 5, 6].map((n) => (
          <CalcButton
            key={n}
            variant="number"
            onClick={() => handleNumber(n.toString())}
            className="bg-[#3b3b3b]"
          >
            {n}
          </CalcButton>
        ))}
        <CalcButton
          variant="operator"
          onClick={() => handleOperator("-")}
          className="bg-[#323232]"
        >
          <Minus size={20} />
        </CalcButton>

        {[1, 2, 3].map((n) => (
          <CalcButton
            key={n}
            variant="number"
            onClick={() => handleNumber(n.toString())}
            className="bg-[#3b3b3b]"
          >
            {n}
          </CalcButton>
        ))}
        <CalcButton
          variant="operator"
          onClick={() => handleOperator("+")}
          className="bg-[#323232]"
        >
          <Plus size={20} />
        </CalcButton>

        <CalcButton
          variant="number"
          onClick={() =>
            setCurrentValue((s) => (parseFloat(s) * -1).toString())
          }
          className="bg-[#3b3b3b] text-sm"
        >
          +/-
        </CalcButton>
        <CalcButton
          variant="number"
          onClick={() => handleNumber("0")}
          className="bg-[#3b3b3b]"
        >
          0
        </CalcButton>
        <CalcButton
          variant="number"
          onClick={() =>
            !currentValue.includes(".") && setCurrentValue(currentValue + ".")
          }
          className="bg-[#3b3b3b]"
        >
          .
        </CalcButton>
        <CalcButton
          variant="equals"
          onClick={handleEqual}
          className="bg-[#b794f4] text-zinc-900"
        >
          <Equal size={22} strokeWidth={3} />
        </CalcButton>
      </div>
    </div>
  );
};

export default WindowsCalculator;
