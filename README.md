# Trade Calculator

A simple, responsive web-based trade calculator that helps traders calculate position sizes, take profit, and stop loss levels based on their capital and risk tolerance.

## Features

- Calculate trade volume based on capital and risk percentage
- Automatic take profit (TP) and stop loss (SL) calculations
- Calculation history tracking (last 10 calculations)
- Mobile-responsive design
- Clean, user-friendly interface

## Demo

[Live Demo](https://yourusername.github.io/trade-calculator) *(Update this link with your actual GitHub Pages URL)*

![Screenshot 1403-10-29 at 14 26 31](https://github.com/user-attachments/assets/11fef5e7-e4be-4299-8540-e88547abf47a)


## Usage

1. Enter your trading capital in dollars
2. Specify your risk percentage
3. Input the current market price
4. Click "Calculate" to see:
   - Trade Volume (position size)
   - Take Profit level (TP)
   - Stop Loss level (SL)

The calculator automatically stores your last 10 calculations for reference.

## Technical Details

- Built with vanilla JavaScript
- Styled using Bootstrap 5.3
- Custom CSS for enhanced UI elements
- Responsive design for mobile and desktop use

## Calculations

- Trade Volume = Capital × (Risk Percentage ÷ 100)
- Stop Loss (SL) = Live Price - (Live Price × 0.01) *(1% below entry)*
- Take Profit (TP) = Live Price + (Live Price × 0.03) *(3% above entry)*

