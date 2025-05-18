import { type } from "clipcc-extension"
import defineBlock from "../../utils/define-block"

const categoryID: string = 'tempvar'
const color: string = '' // Use global color

const tempvar = new Map()

const blocks: MyBlock<BlockParams>[] = [
    defineBlock({
        id: 'get',
        type: type.BlockType.REPORTER,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            }
        },
        function(args, util): any {
            const name = String(args.name)
            return (
                tempvar.has(name)
                    ? tempvar.get(name)
                    : ''
            )
        }
    }),
    defineBlock({
        id: 'set',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            },
            value: {
                type: type.ParameterType.STRING,
                defaultValue: '0'
            },
        },
        function(args, util): void {
            const name = String(args.name)
            tempvar.set(name, args.value)
        }
    }),
    defineBlock({
        id: 'plus',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            },
            number: {
                type: type.ParameterType.NUMBER,
                defaultValue: '1'
            },
        },
        function(args, util): void {
            const name = String(args.name)

            let left = +tempvar.get(name)
            if (Number.isNaN(left))
                left = 0

            let right = +args.number
            if (Number.isNaN(right))
                right = 0

            tempvar.set(name, left + right)
        }
    }),
    defineBlock({
        id: 'join',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            },
            value: {
                type: type.ParameterType.STRING,
                defaultValue: 'banana'
            },
        },
        function(args, util): void {
            const name = String(args.name)
            const left = (
                tempvar.has(name)
                    ? String(tempvar.get(name))
                    : ''
            )
            tempvar.set(name, left + args.value)
        }
    }),
    defineBlock({
        id: 'has',
        type: type.BlockType.BOOLEAN,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            }
        },
        function(args, util): boolean {
            const name = String(args.name)
            return tempvar.has(name)
        }
    }),
    defineBlock({
        id: 'delete',
        type: type.BlockType.COMMAND,
        param: {
            name: {
                type: type.ParameterType.STRING,
                defaultValue: 'temp1'
            }
        },
        function(args, util): boolean {
            const name = String(args.name)
            return tempvar.delete(name)
        }
    }),
    defineBlock({
        id: 'clear',
        type: type.BlockType.COMMAND,
        function(args, util): void {
            tempvar.clear()
        }
    }),
]



export const category_tempvar: MyCategory = {
    id: categoryID,
    color,
    blocks,
}
